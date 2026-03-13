"use strict";

const TRANS_TEXT_TYPES = new Set(["string", "text", "richtext", "email"]);
const COPY_ONLY_TYPES = new Set([
  "biginteger",
  "boolean",
  "date",
  "datetime",
  "decimal",
  "enumeration",
  "float",
  "integer",
  "json",
  "media",
  "password",
  "relation",
  "time",
  "timestamp",
]);

function decodeHtmlEntities(value) {
  return String(value)
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function isLocalizedAttribute(attribute) {
  return attribute?.pluginOptions?.i18n?.localized === true;
}

function slugify(value) {
  const normalized = String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "";
}

module.exports = ({ strapi }) => {
  const translationCache = new Map();

  const getTranslationApiKey = () => {
    const key = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (!key) {
      const error = new Error("GOOGLE_TRANSLATE_API_KEY is not configured.");
      error.status = 400;
      throw error;
    }

    return key;
  };

  const translateBatch = async (texts, sourceLocale, targetLocale) => {
    const normalized = texts.map((text) => String(text ?? ""));
    const keys = normalized.map((text) => `${sourceLocale}:${targetLocale}:${text}`);
    const cached = new Map();
    const uncached = [];

    keys.forEach((cacheKey, index) => {
      if (translationCache.has(cacheKey)) {
        cached.set(index, translationCache.get(cacheKey));
      } else if (normalized[index].trim() !== "") {
        uncached.push({ index, text: normalized[index], cacheKey });
      } else {
        cached.set(index, normalized[index]);
      }
    });

    if (uncached.length > 0) {
      const apiKey = getTranslationApiKey();
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: uncached.map((item) => item.text),
            source: sourceLocale,
            target: targetLocale,
            format: "text",
          }),
        }
      );

      const payload = await response.json();

      if (!response.ok) {
        const message =
          payload?.error?.message || "Google Translation API returned a non-success response.";
        const error = new Error(message);
        error.status = response.status;
        throw error;
      }

      const translated = payload?.data?.translations;

      if (!Array.isArray(translated) || translated.length !== uncached.length) {
        throw new Error("Unexpected response from Google Translation API.");
      }

      translated.forEach((item, index) => {
        const translatedText = decodeHtmlEntities(item?.translatedText || uncached[index].text);
        translationCache.set(uncached[index].cacheKey, translatedText);
        cached.set(uncached[index].index, translatedText);
      });
    }

    return normalized.map((text, index) => cached.get(index) ?? text);
  };

  const translateText = async (value, sourceLocale, targetLocale) => {
    if (typeof value !== "string" || value.trim() === "") {
      return value;
    }

    const [translated] = await translateBatch([value], sourceLocale, targetLocale);
    return translated;
  };

  const translateBlocks = async (value, sourceLocale, targetLocale) => {
    if (!Array.isArray(value)) {
      return value;
    }

    const visit = async (node) => {
      if (Array.isArray(node)) {
        return Promise.all(node.map(visit));
      }

      if (!node || typeof node !== "object") {
        return node;
      }

      const next = { ...node };

      if (typeof next.text === "string") {
        next.text = await translateText(next.text, sourceLocale, targetLocale);
      }

      const entries = Object.entries(next);
      for (const [key, child] of entries) {
        if (key === "text") {
          continue;
        }

        if (Array.isArray(child)) {
          next[key] = await Promise.all(child.map(visit));
        } else if (child && typeof child === "object") {
          next[key] = await visit(child);
        }
      }

      return next;
    };

    return visit(value);
  };

  const translateComponentValue = async ({
    componentUid,
    value,
    sourceLocale,
    targetLocale,
  }) => {
    const componentSchema = strapi.getModel(componentUid);

    if (!componentSchema || !value) {
      return value;
    }

    if (Array.isArray(value)) {
      return Promise.all(
        value.map((item) =>
          translateEntityBySchema({
            schema: componentSchema,
            data: item,
            sourceLocale,
            targetLocale,
          })
        )
      );
    }

    return translateEntityBySchema({
      schema: componentSchema,
      data: value,
      sourceLocale,
      targetLocale,
    });
  };

  const translateAttributeValue = async ({
    attribute,
    value,
    sourceLocale,
    targetLocale,
  }) => {
    if (value == null) {
      return value;
    }

    if (!isLocalizedAttribute(attribute) && attribute.type !== "uid") {
      return value;
    }

    if (TRANS_TEXT_TYPES.has(attribute.type)) {
      return translateText(value, sourceLocale, targetLocale);
    }

    if (attribute.type === "blocks") {
      return translateBlocks(value, sourceLocale, targetLocale);
    }

    if (attribute.type === "component") {
      return translateComponentValue({
        componentUid: attribute.component,
        value,
        sourceLocale,
        targetLocale,
      });
    }

    if (attribute.type === "dynamiczone") {
      if (!Array.isArray(value)) {
        return value;
      }

      return Promise.all(
        value.map((item) => {
          if (!item?.__component) {
            return item;
          }

          return translateComponentValue({
            componentUid: item.__component,
            value: item,
            sourceLocale,
            targetLocale,
          });
        })
      );
    }

    if (COPY_ONLY_TYPES.has(attribute.type)) {
      return value;
    }

    return value;
  };

  const translateEntityBySchema = async ({
    schema,
    data,
    sourceLocale,
    targetLocale,
  }) => {
    if (!data || typeof data !== "object") {
      return data;
    }

    const next = { ...data };
    const uidAttributes = [];

    for (const [name, attribute] of Object.entries(schema.attributes || {})) {
      if (!(name in next)) {
        continue;
      }

      if (attribute.type === "uid") {
        uidAttributes.push([name, attribute]);
        continue;
      }

      next[name] = await translateAttributeValue({
        attribute,
        value: next[name],
        sourceLocale,
        targetLocale,
      });
    }

    for (const [name, attribute] of uidAttributes) {
      const targetField = attribute.targetField;
      const translatedSource = targetField ? next[targetField] : next[name];
      const slug = slugify(translatedSource);
      next[name] = slug || next[name];
    }

    return next;
  };

  return {
    async translateEntry({ data, modelUid, sourceLocale, targetLocale }) {
      const model = strapi.getModel(modelUid);

      if (!model) {
        const error = new Error(`Unknown model UID: ${modelUid}`);
        error.status = 400;
        throw error;
      }

      if (sourceLocale === targetLocale) {
        return data;
      }

      return translateEntityBySchema({
        schema: model,
        data,
        sourceLocale,
        targetLocale,
      });
    },
  };
};

"use strict";

const PLUGIN_ID = "translate-from-locale";

module.exports = {
  async translate(ctx) {
    const { data, model, sourceLocale, targetLocale } = ctx.request.body || {};

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return ctx.badRequest("Expected `data` to be an object.");
    }

    if (typeof model !== "string" || model.length === 0) {
      return ctx.badRequest("Expected `model` to be a content type UID.");
    }

    if (typeof sourceLocale !== "string" || typeof targetLocale !== "string") {
      return ctx.badRequest("Expected `sourceLocale` and `targetLocale` to be strings.");
    }

    try {
      const translated = await strapi
        .plugin(PLUGIN_ID)
        .service("translate")
        .translateEntry({
          data,
          modelUid: model,
          sourceLocale,
          targetLocale,
        });

      ctx.body = { data: translated };
    } catch (error) {
      strapi.log.error("Translate from locale failed", error);
      ctx.throw(error.status || 500, error.message || "Translation failed.");
    }
  },
};

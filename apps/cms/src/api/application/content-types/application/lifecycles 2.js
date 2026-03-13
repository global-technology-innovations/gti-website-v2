"use strict";

const normalize = (data = {}) => {
  if (typeof data.email === "string") {
    const v = data.email.trim();
    data.email = v === "" ? null : v;
  }
  if (typeof data.name === "string") data.name = data.name.trim();
  if (typeof data.phone === "string") data.phone = data.phone.trim();
  if (typeof data.coverText === "string") data.coverText = data.coverText.trim();
};

module.exports = {
  async afterCreate(event) {
    try {
      const id = event.result.id;

      const app = await strapi.entityService.findOne(
        "api::application.application",
        id,
        { populate: { job: true, cv: true } }
      );

      const toRaw =
        process.env.APPLICATIONS_RECEIVER_EMAIL ||
        process.env.CONTACT_FORM_EMAIL ||
        process.env.EMAIL_DEFAULT_REPLY_TO ||
        process.env.EMAIL_DEFAULT_FROM;

      if (!toRaw) {
        strapi.log.error("No recipient email configured for applications");
        return;
      }
      const to = toRaw.split(",").map((s) => s.trim()).filter(Boolean);

      const lines = [
        `Нова заявка на вакансію: ${app?.job?.title || "-"}`,
        "",
        `Ім’я: ${app?.name || "-"}`,
        `Email: ${app?.email || "-"}`,
        `Телефон: ${app?.phone || "-"}`,
        "",
        "Супровідний лист:",
        (app?.coverText || "-").toString(),
        "",
      ];

      const files = Array.isArray(app.cv) ? app.cv : (app.cv ? [app.cv] : []);
      if (files.length) {
        lines.push("CV:");
        
        for (const f of files) {
          const base = process.env.PUBLIC_URL || "";
          const url = f.url?.startsWith("http") ? f.url : `${base}${f.url}`;
          lines.push(`- ${f.name} (${f.ext}, ${Math.round(f.size * 100) / 100} KB): ${url}`);
        }
      } else {
        lines.push("CV: —");
      }

      await strapi.plugin("email").service("email").send({
        to,
        subject: `Нова заявка: ${app?.name || "Кандидат"} → ${app?.job?.title || "Вакансія"}`,
        text: lines.join("\n"),
      });
    } catch (err) {
      strapi.log.error("Application afterCreate email error", err);
    }
  },
};

// "use strict";

// module.exports = {
//   async handleSubmit(ctx) {
//     try {
//       const { name, email, phone, message, _hp } = ctx.request.body || {};

//       if (_hp) return ctx.send({ ok: true });

//       if (!name || !message) {
//         return ctx.badRequest("Missing required fields: name and message are required");
//       }

//       if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         return ctx.badRequest("Invalid email format");
//       }

//       await strapi.plugin("email").service("email").send({
//         to: process.env.CONTACT_FORM_EMAIL,
//         subject: "Нове повідомлення з контактної форми",
//         text: [
//           `Ім’я: ${name}`,
//           `Email: ${email || "-"}`,
//           `Телефон: ${phone || "-"}`,
//           "",
//           "Повідомлення:",
//           message,
//         ].join("\n"),
//       });

//       return ctx.send({ ok: true });
//     } catch (err) {
//       strapi.log.error("Contact form email error", err);
//       return ctx.internalServerError("Email send failed");
//     }
//   },
// };

"use strict";

module.exports = {
  async handleSubmit(ctx) {
    try {
      const { name, email, phone, message, _hp } = ctx.request.body || {};

      // 🧠 Антиспам honeypot
      if (_hp) {
        strapi.log.warn("🪤 Honeypot triggered — bot submission blocked.");
        return ctx.send({ ok: true });
      }

      // 🧩 Валідація
      if (!name || !message) {
        strapi.log.warn("❌ Missing required fields");
        return ctx.badRequest(
          "Missing required fields: name and message are required"
        );
      }

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        strapi.log.warn("❌ Invalid email format:", email);
        return ctx.badRequest("Invalid email format");
      }

      const toAddress =
        process.env.CONTACT_FORM_EMAIL ||
        "info@global-technology-innovations.com";

      strapi.log.info(`📨 Sending contact form email to ${toAddress}`);

      // ✉️ Відправка
      const result = await strapi
        .plugin("email")
        .service("email")
        .send({
          to: toAddress,
          from: "info@global-technology-innovations.com",
          replyTo: email || "info@global-technology-innovations.com",
          subject: "Нове повідомлення з контактної форми",
          text: [
            `Ім’я: ${name}`,
            `Email: ${email || "-"}`,
            `Телефон: ${phone || "-"}`,
            "",
            "Повідомлення:",
            message,
          ].join("\n"),
        });

      strapi.log.info("✅ Email sent successfully", result);

      return ctx.send({ ok: true });
    } catch (err) {
      // 🧾 Повне логування помилки
      strapi.log.error("❌ Contact form email error:", err);

      ctx.status = 500;
      ctx.body = {
        ok: false,
        error: err.message || "Email send failed",
        stack: err.stack,
      };
    }
  },
};

module.exports = ({ env }) => ({
  i18n: {
    enabled: true,
    config: {
      locales: ["en", "uk", "cs", "de", "fr", "sk"],
      defaultLocale: "uk",
    },
  },

  "translate-from-locale": {
    enabled: true,
    resolve: "./src/plugins/translate-from-locale",
  },

  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "mail.privateemail.com"),
        port: env.int("SMTP_PORT", 465),
        secure: true,
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
      },
      settings: {
        defaultFrom: "info@global-technology-innovations.com",
        defaultReplyTo: "info@global-technology-innovations.com",
      },
    },
  },
});

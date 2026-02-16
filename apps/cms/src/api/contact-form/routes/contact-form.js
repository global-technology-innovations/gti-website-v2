"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/contact-form",
      handler: "contact-form.handleSubmit",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};

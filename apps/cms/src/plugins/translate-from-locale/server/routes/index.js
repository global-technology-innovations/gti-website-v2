"use strict";

module.exports = {
  admin: {
    type: "admin",
    routes: [
      {
        method: "POST",
        path: "/translate",
        handler: "translate.translate",
        config: {
          policies: ["admin::isAuthenticatedAdmin"],
        },
      },
    ],
  },
};

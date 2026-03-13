import pluginId from "./pluginId";
import InjectedTranslationControls from "./components/TranslateFromLocaleButton";

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      name: pluginId,
    });
  },

  bootstrap(app) {
    app.injectContentManagerComponent("editView", "informations", {
      name: "translate-from-locale-button",
      Component: InjectedTranslationControls,
    });
  },

  async registerTrads() {
    return [];
  },
};

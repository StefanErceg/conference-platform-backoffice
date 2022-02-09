import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./resources/index";

const fallbackLng = ["en"];
export const availableLanguages = ["en", "srb"];

i18n.use(initReactI18next).init({
  fallbackLng,
  resources: translations,
});

export default i18n;

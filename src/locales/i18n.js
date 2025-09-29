// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/translation.json";
import ar from "./ar/translation.json";

const resources = {
  en: { translation: en },
  ar: { translation: ar }
};

// حاول نقرأ اللغة المخزنة أو نستخدم اللغة الافتراضية من i18n
const saved = localStorage.getItem("i18nextLng") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: saved,
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });
  document.documentElement.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");

i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("dir", lng === "ar" ? "rtl" : "ltr");
});

export default i18n;

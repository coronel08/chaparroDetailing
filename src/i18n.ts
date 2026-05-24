import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import es from "./locales/es.json";

// 1. Respect the user's explicit toggle choice (stored in localStorage)
// 2. Otherwise auto-detect from the browser/device language setting
// 3. Fall back to English if neither is Spanish
const savedLang = localStorage.getItem("lang");
const browserLang = navigator.language?.toLowerCase() ?? "";
const detectedLang =
    savedLang ?? (browserLang.startsWith("es") ? "es" : "en");

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        es: { translation: es },
    },
    lng: detectedLang,
    fallbackLng: "en",
    interpolation: {
        escapeValue: false, // React already escapes values
    },
});

export default i18n;

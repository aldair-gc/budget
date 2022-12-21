import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import { Container } from "./style";
import Budget from "../budget";
import Authentication from "../features/authentication/auth";
import { ThemeProvider } from "styled-components";
import { createContext, useState } from "react";
import Loading from "../common/Loading/Loading";
import { dark } from "../themes/dark";
import { light } from "../themes/light";
import { enUS } from "../language/enUS";
import { ptBR } from "../language/ptBR";
import { real } from "../currency/real";
import { americanDolar } from "../currency/americanDolar";

export const MessageContext = createContext({ type: "idle", message: "no description" });
export const LoadingContext = createContext({
  status: "idle",
  setStatus: (status: string) => {
    status;
  },
});
export const LanguageContext = createContext({
  language: "enUS",
  file: enUS,
  setLanguage: (language: "pt-BR" | "en-US") => {
    language;
  },
});
export const NumberContext = createContext({
  country: "ptBR",
  number: real,
  setCountry: (country: "pt-BR" | "en-US") => {
    country;
  },
});
export const ThemeContext = createContext({
  themeId: "auto",
  theme: light,
  setTheme: (themeId: "auto" | "dark" | "light") => {
    themeId;
  },
});
const supportedLanguages = ["pt-BR", "en-US"];
const supportedCurrencies = ["pt-BR", "en-US"];

export default function App() {
  const [loading, setLoading] = useState({ status: "idle", setStatus: setLoadingStatus });
  const [theme, setTheme] = useState(getTheme());
  const [lang, setLang] = useState(getLanguage());
  const [number, setCountry] = useState(getCurrency());

  function getTheme() {
    const savedThemeId = window.localStorage.getItem("theme");
    const themeId = savedThemeId || "auto";
    const theme = themeId === "auto" ? isSystemDark() : themeId === "dark" ? dark : light;
    return { themeId, theme, setTheme: changeTheme };
  }

  function getLanguage() {
    const language =
      window.localStorage.getItem("language") || (supportedLanguages.includes(navigator.language) ? navigator.language : "en-US");
    const file = language === "pt-BR" ? ptBR : enUS;
    return { language, file, setLanguage: changeLanguage };
  }

  function getCurrency() {
    const country =
      window.localStorage.getItem("currency") || (supportedCurrencies.includes(navigator.language) ? navigator.language : "en-US");
    const number = country === "pt-BR" ? real : americanDolar;
    return { country, number, setCountry: changeNumber };
  }

  function isSystemDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? dark : light;
  }

  window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      setTheme(getTheme());
    });

  function setLoadingStatus(status: string): void {
    setLoading({ status, setStatus: setLoadingStatus });
  }

  function changeLanguage(language: "en-US" | "pt-BR"): void {
    const file = language === "pt-BR" ? ptBR : enUS;
    window.localStorage.setItem("language", language);
    setLang({ language, file, setLanguage: changeLanguage });
  }

  function changeNumber(country: "en-US" | "pt-BR"): void {
    const number = country === "pt-BR" ? real : americanDolar;
    window.localStorage.setItem("currency", country);
    setCountry({ country, number, setCountry: changeNumber });
  }

  function changeTheme(themeId: "light" | "dark" | "auto"): void {
    const newTheme = themeId === "auto" ? isSystemDark() : themeId === "dark" ? dark : light;
    window.localStorage.setItem("theme", themeId);
    setTheme({ themeId, theme: newTheme, setTheme: changeTheme });
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageContext.Provider value={lang}>
          <NumberContext.Provider value={number}>
            <ThemeContext.Provider value={theme}>
              <ThemeProvider theme={theme.theme}>
                <MessageContext.Provider value={{ type: "idle", message: "no description" }}>
                  <LoadingContext.Provider value={loading}>
                    <Container>
                      <Authentication />
                      <Budget />
                      <Loading />
                    </Container>
                  </LoadingContext.Provider>
                </MessageContext.Provider>
              </ThemeProvider>
            </ThemeContext.Provider>
          </NumberContext.Provider>
        </LanguageContext.Provider>
      </PersistGate>
    </Provider>
  );
}

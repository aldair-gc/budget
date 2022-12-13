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

export const MessageContext = createContext({type: "idle", message: "no description"});
export const LoadingContext = createContext({status: "idle", setStatus: (status: string) => {status;}});
export const LanguageContext = createContext({language: "enUS", file: enUS, setLanguage: (language: "pt-BR" | "en-US") => {language;}});
export const NumberContext = createContext({country: "ptBR", number: real, setCountry: (country: "pt-BR" | "en-US") => {country;}});
export const ThemeContext = createContext({themeId: "auto", theme: light, setTheme: (themeId: "auto" | "dark" | "light") => {themeId;}});

export default function App() {
  const [loading, setLoading] = useState({status: "idle", setStatus: setLoadingStatus});
  const [theme, setTheme] = useState({themeId: "auto", theme: isSystemDark(), setTheme: changeTheme});
  const [lang, setLang] = useState({
    language: navigator.language,
    file: navigator.language === "pt-BR" ? ptBR : enUS,
    setLanguage: changeLanguage,
  });
  const [number, setCountry] = useState({
    country: navigator.language === "pt-BR" ? "pt-BR" : "en-US",
    number: navigator.language === "pt-BR" ? real : americanDolar,
    setCountry: changeNumber,
  });

  function isSystemDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? dark : light;
  }

  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    const newTheme = e.matches ? dark : light;
    setTheme({themeId: "auto", theme: newTheme, setTheme: changeTheme});
  });

  function setLoadingStatus(status: string): void {
    setLoading({status, setStatus: setLoadingStatus});
  }

  function changeLanguage(language: "en-US" | "pt-BR"): void {
    const file = language === "pt-BR" ? ptBR : enUS;
    setLang({language, file, setLanguage: changeLanguage});
  }

  function changeNumber(country: "en-US" | "pt-BR"): void {
    const number = country === "pt-BR" ? real : americanDolar;
    setCountry({country, number, setCountry: changeNumber});
  }

  function changeTheme(themeId: "light" | "dark" | "auto"): void {
    const newTheme = themeId === "auto" ? isSystemDark() : themeId === "dark" ? dark : light ;
    setTheme({themeId , theme: newTheme, setTheme: changeTheme});
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageContext.Provider value={lang}>
          <NumberContext.Provider value={number}>
            <ThemeContext.Provider value={theme}>
              <ThemeProvider theme={theme.theme}>
                <MessageContext.Provider value={{type: "idle", message: "no description"}}>
                  <LoadingContext.Provider value={loading}>
                    <Container>
                      <Authentication/>
                      <Budget/>
                      <Loading/>
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

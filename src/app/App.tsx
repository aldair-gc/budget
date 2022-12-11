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

export const MessageContext = createContext({type: "idle", message: "no description"});
export const LoadingContext = createContext({status: "idle", setStatus: (status: string) => {status;}});
export const ThemeContext = createContext({colorTheme: "auto", setColorTheme: (colorTheme: "auto" | "dark" | "light") => {colorTheme;}});

export default function App() {
  const [loading, setLoading] = useState({status: "idle", setStatus: setLoadingStatus});
  const [colorTheme, setColorTheme] = useState({colorTheme: isSystemDark(), setColorTheme: changeTheme});

  function isSystemDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    const newTheme = e.matches ? "dark" : "light";
    setColorTheme({colorTheme: newTheme, setColorTheme: colorTheme.setColorTheme});
  });

  function setLoadingStatus(status: string): void {
    setLoading({status, setStatus: setLoadingStatus});
  }

  function changeTheme(themeName: "light" | "dark" | "auto"): void {
    const newTheme = themeName === "auto" ? isSystemDark() : themeName;
    setColorTheme({colorTheme: newTheme, setColorTheme: colorTheme.setColorTheme});
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeContext.Provider value={colorTheme}>
          <ThemeProvider theme={colorTheme.colorTheme === "dark" ? dark : light}>
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
      </PersistGate>
    </Provider>
  );
}

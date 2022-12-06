import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import { Container } from "./style";
import Budget from "../features/budget";
import Authentication from "../features/authentication/auth";
import { ThemeProvider } from "styled-components";
import { light } from "../themes/light";
import { createContext, useState } from "react";
import Loading from "../common/Loading/Loading";
import Settings from "../features/settings/Settings";

export const MessageContext = createContext({type: "idle", message: "no description"});
export const LoadingContext = createContext({status: "idle", setStatus: (status: string) => {status;} });

export default function App() {
  const [loading, setLoading] = useState({status: "idle", setStatus: setLoadingStatus});

  function setLoadingStatus(status: string): void {
    setLoading({status, setStatus: setLoadingStatus});
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={light}>
          <MessageContext.Provider value={{type: "idle", message: "no description"}}>
            <LoadingContext.Provider value={loading}>
              <Container>
                <Authentication/>
                <Budget/>
                <Loading/>
                <Settings/>
              </Container>
            </LoadingContext.Provider>
          </MessageContext.Provider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

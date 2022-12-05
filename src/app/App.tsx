import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import { Container } from "./style";
import Budget from "../features/budget";
import Authentication from "../features/authentication/auth";
import { ThemeProvider } from "styled-components";
import { light } from "../themes/light";
import { createContext } from "react";

const MessageContext = createContext({type: "idle", message: "no description"});

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={light}>
          <MessageContext.Provider value={{type: "idle", message: "no description"}}>
            <Container>
              <Authentication/>
              <Budget/>
            </Container>
          </MessageContext.Provider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
// context loading, success, error

import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import { Container } from "./style";
import Budget from "../features/budget";
import Authentication from "../features/authentication/auth";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Container>
          <Authentication/>
          <Budget/>
        </Container>
      </PersistGate>
    </Provider>
  );
}

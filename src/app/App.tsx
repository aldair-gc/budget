import { Component } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import Login from "../features/authentication/login";
import { Container } from "./style";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <Login/>
          </Container>
        </PersistGate>
      </Provider>
    );
  }
}

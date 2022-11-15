import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "./global-style";
import App from "./app/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App/>
    <GlobalStyle/>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle, { Container } from "./global-style";
import { ToastContainer } from "react-toastify";
import Routers from "./routes/index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer autoClose={3000}/>
      <Container>
        <Routers/>
      </Container>
      <GlobalStyle/>
    </BrowserRouter>
  </React.StrictMode>
);

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useContext, useState } from "react";
import isEmail from "validator/lib/isEmail";
import { LanguageContext, LoadingContext } from "../../app/App";
import { useAppDispatch } from "../../app/hooks";
import axios from "../../services/axios";
import { authFailure, authSuccess } from "./authSlice";
import { InputContainer } from "./style";

export default function Login(props: { position: (arg0: number) => void }) {
  const dispatch = useAppDispatch();
  const lang = useContext(LanguageContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [msgEmail, setMsgEmail] = useState("");
  const [msgPassword, setMsgPassword] = useState("");

  function verify() {
    if (!isEmail(email)) {
      setMsgEmail(lang.file.auth.invalidEmailMessage);
    } else {
      setMsgEmail("");
    }

    if (password.length < 6 || password.length > 50) {
      setMsgPassword(lang.file.auth.invalidPasswordMessage);
    } else {
      setMsgPassword("");
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>, setStatus: (status: "idle" | "loading" | "success" | "failure") => void) {
    e.preventDefault();
    verify();
    if (msgEmail && msgPassword) {
      setResponse(lang.file.auth.checkFieldsAbove);
      return;
    }

    try {
      setStatus("loading");
      const loginRequest = await axios.post("/token", { email, password });
      if (loginRequest.data.token) {
        dispatch(authSuccess(loginRequest.data));
        axios.defaults.headers.common["Authorization"] = `Bearer ${loginRequest.data.token}`;
        setResponse(lang.file.auth.userLoggedIn);
        setStatus("success");
      } else {
        dispatch(authFailure());
        setResponse(lang.file.auth.authFailure);
        setStatus("failure");
      }
    } catch (error: any) {
      setStatus("failure");
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => setResponse(err));
    }
  }

  return (
    <LanguageContext.Consumer>
      {({ file }) => (
        <LoadingContext.Consumer>
          {({ setStatus }) => (
            <InputContainer>
              <h2>{file.auth.login}</h2>

              <form onSubmit={(e) => handleSubmit(e, setStatus)}>
                <label htmlFor="login-email">{file.auth.email}</label>
                <input
                  type="email"
                  name="login-email"
                  id="login-email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <small>{msgEmail}</small>

                <label htmlFor="login-password">{file.auth.password}</label>
                <input
                  type="password"
                  name="login-password"
                  id="login-password"
                  autoComplete="current-password"
                  placeholder="*****"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small>{msgPassword}</small>

                <input type="submit" value={file.auth.login} />
              </form>

              <h3 onClick={() => props.position(2)}>{file.auth.registerNewUser}</h3>
              <small>{response}</small>
            </InputContainer>
          )}
        </LoadingContext.Consumer>
      )}
    </LanguageContext.Consumer>
  );
}

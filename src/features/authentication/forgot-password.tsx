/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useContext, useEffect, useState } from "react";
import isEmail from "validator/lib/isEmail";
import { LanguageContext, LoadingContext } from "../../app/App";
import axios from "../../services/axios";
import { ErrorMessagesInterface } from "./interfaces";
import { InputContainer } from "./style";

export default function ForgotPassword(props: { position: (arg0: number) => void }) {
  const lang = useContext(LanguageContext);

  const [email, setEmail] = useState("");
  const [msgEmail, setMsgEmail] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (email && !isEmail(email)) {
      setMsgEmail(lang.file.auth.invalidEmailMessage);
    } else {
      setMsgEmail("");
    }
  }, [email, lang.file.auth.invalidEmailMessage]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>, setStatus: (status: "idle" | "loading" | "success" | "failure") => void) {
    e.preventDefault();
    if (msgEmail || !email) {
      setResponse(lang.file.auth.checkFieldsAbove);
      return;
    }

    try {
      setStatus("loading");
      const loginRequest = await axios.post("/password/forgot", { email });
      if (loginRequest.data.passwordRequest) {
        console.log(loginRequest.data);
        setResponse(lang.file.auth.checkYourEmail);
        setStatus("success");
      } else {
        setResponse(lang.file.auth.requestFailed);
        setStatus("failure");
      }
    } catch (error: any) {
      setStatus("failure");
      setResponse(lang.file.errorMessages[`${(error.response.data.error as ErrorMessagesInterface) || "invalidRequest"}`]);
    }
  }

  return (
    <LanguageContext.Consumer>
      {({ file }) => (
        <LoadingContext.Consumer>
          {({ setStatus }) => (
            <InputContainer>
              <h2>{file.auth.forgotPassword}</h2>

              <p>{file.auth.forgotMessage}</p>

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

                <input type="submit" value={file.auth.request} />
              </form>

              <h3 onClick={() => props.position(1)}>{file.auth.loginRegisteredUser}</h3>
              <small>{response}</small>
            </InputContainer>
          )}
        </LoadingContext.Consumer>
      )}
    </LanguageContext.Consumer>
  );
}

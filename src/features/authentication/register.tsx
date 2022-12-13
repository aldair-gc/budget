/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useContext, useState } from "react";
import isEmail from "validator/lib/isEmail";
import { LanguageContext, LoadingContext } from "../../app/App";
import axios from "../../services/axios";
import { InputContainer } from "./style";

export default function Register(props: { position: (arg0: number) => void; }) {
  const lang = useContext(LanguageContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [msgName, setMsgName] = useState("");
  const [msgEmail, setMsgEmail] = useState("");
  const [msgPassword, setMsgPassword] = useState("");

  function verify() {
    if (name === "") {
      setMsgName(lang.file.auth.invalidNameMessage);
    } else {
      setMsgName("");
    }

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
    if (msgName && msgEmail && msgPassword) {
      setResponse(lang.file.auth.checkFieldsAbove);
      return;
    }

    try {
      setStatus("loading");
      const registerRequest = await axios.post("/user", { name, email, password });
      if (registerRequest.status === 200) {
        props.position(1);
        setStatus("success");
      } else {
        setResponse(lang.file.auth.checkFieldsAbove);
        setStatus("failure");
      }
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => setResponse(err));
      setStatus("failure");
    }
  }

  return (
    <LanguageContext.Consumer>
      {({file}) => (
        <LoadingContext.Consumer>
          {({setStatus}) => (
            <InputContainer>
              <h2>{file.auth.register}</h2>

              <form onSubmit={(e) => handleSubmit(e, setStatus)}>
                <label htmlFor="name">{file.auth.name}</label>
                <input type="text" name="name" id="name"
                  autoComplete="name" placeholder={file.auth.yourName} required
                  onChange={(e) => setName(e.target.value)}
                />
                <small>{msgName}</small>

                <label htmlFor="email">{file.auth.email}</label>
                <input type="email" name="email" id="email"
                  autoComplete="email" placeholder={file.auth.yourEmail} required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <small>{msgEmail}</small>

                <label htmlFor="password">{file.auth.password}</label>
                <input type="password" name="password" id="password"
                  autoComplete="new-password" placeholder="*****" required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small>{msgPassword}</small>

                <input type="submit" value={file.auth.register} />

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

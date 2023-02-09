/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useContext, useEffect, useState } from "react";
import { LanguageContext, LoadingContext } from "../../app/App";
import axios from "../../services/axios";
import { InputContainer } from "./style";
import { ErrorMessagesInterface } from "./interfaces";

export default function ResetPassword(props: { position: (arg0: number) => void }) {
  const lang = useContext(LanguageContext);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msgPassword, setMsgPassword] = useState("");
  const [msgConfirmPassword, setMsgConfirmPassword] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (password && (password.length < 6 || password.length > 50)) {
      setMsgPassword(lang.file.auth.invalidPasswordMessage);
    } else {
      setMsgPassword("");
    }

    if (password !== confirmPassword) {
      setMsgConfirmPassword(lang.file.auth.confirmPasswordMessage);
    } else {
      setMsgConfirmPassword("");
    }
  }, [password, confirmPassword, lang.file.auth.invalidPasswordMessage, lang.file.auth.confirmPasswordMessage]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>, setStatus: (status: "idle" | "loading" | "success" | "failure") => void) {
    e.preventDefault();
    if (msgPassword || msgConfirmPassword || !password || !confirmPassword) {
      setResponse(lang.file.auth.checkFieldsAbove);
      return;
    }

    try {
      setStatus("loading");
      const urlParams = new URLSearchParams(window.location.search);
      const registeredEmail = urlParams.get("email");
      const confirmationCode = urlParams.get("code");

      const resetRequest = await axios.put("/password/reset/", { registeredEmail, confirmationCode, password });
      if (resetRequest.data.passwordUpdated) {
        setResponse(lang.file.auth.newPasswordSaved);
        setStatus("success");
        props.position(0);
      } else {
        setResponse(lang.file.auth.requestFailed);
        setStatus("failure");
      }
    } catch (error: any) {
      setStatus("failure");
      setResponse(lang.file.errorMessages[`${error.response.data.error as ErrorMessagesInterface}`]);
    }
  }

  return (
    <LanguageContext.Consumer>
      {({ file }) => (
        <LoadingContext.Consumer>
          {({ setStatus }) => (
            <InputContainer>
              <h2>Create a new Password</h2>

              <form onSubmit={(e) => handleSubmit(e, setStatus)}>
                <label htmlFor="password">{file.auth.password}</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small>{msgPassword}</small>

                <label htmlFor="confirmPassword">{file.auth.confirmPassword}</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="new-password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <small>{msgConfirmPassword}</small>

                <input type="submit" value={file.auth.save} />
              </form>

              <h3 onClick={() => props.position(0)}>{file.auth.loginRegisteredUser}</h3>
              <small>{response}</small>
            </InputContainer>
          )}
        </LoadingContext.Consumer>
      )}
    </LanguageContext.Consumer>
  );
}

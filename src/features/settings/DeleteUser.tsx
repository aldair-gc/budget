/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { LanguageContext, LoadingContext } from "../../app/App";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axios from "../../services/axios";
import { authLogout } from "../authentication/authSlice";
import { InputContainer } from "./style";

export default function DeleteUser() {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const lang = useContext(LanguageContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [msgEmail, setMsgEmail] = useState("");
  const [msgPassword, setMsgPassword] = useState("");

  function verify() {
    if (email !== user.email) {
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

  async function handleSubmit(setLoading: (status: string) => void) {
    verify();
    if (msgEmail && msgPassword) {
      setResponse(lang.file.auth.checkFieldsAbove);
      return;
    }

    try {
      setLoading("loading");
      const confirmationRequest = await axios.post("/token", { email, password });
      if (confirmationRequest.data.token) {
        const deletionRequest = await axios.delete("/user");
        if (deletionRequest.data.userDeleted) {
          setLoading("success");
          dispatch(authLogout());
          setResponse(lang.file.deleteUser.userDeleted);
        }
      } else {
        setLoading("failure");
        setResponse(lang.file.auth.authFailure);
      }
    } catch (error: any) {
      setLoading("failure");
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => setResponse(err));
    }
  }

  return (
    <LanguageContext.Consumer>
      {({file})=> (
        <InputContainer>
          <h2>{file.deleteUser.deleteUserAccount}</h2>
          <p>{file.deleteUser.warning}</p>
          <p>{file.deleteUser.instructions}</p>

          <LoadingContext.Consumer>
            {({setStatus}) => (
              <form>
                <label htmlFor="email">{file.auth.email}</label>
                <input type="email" name="email" id="email" value={email}
                  autoComplete="email" placeholder="your@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <small>{email && msgEmail}</small>

                <label htmlFor="password">{file.auth.password}</label>
                <input type="password" name="password" id="password" value={password}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small>{password && msgPassword}</small>

                <div className="select-if-update">
                  <input type="checkbox" name="confirmation" id="confirmation" onChange={() => setConfirm(!confirm)}/>
                  <p>{file.deleteUser.confirmationConsent}</p>
                </div>

                <input type="submit" value={file.deleteUser.confirm} disabled={!confirm} onClick={(e) => { e.preventDefault(); handleSubmit(setStatus); }} />
              </form>
            )}
          </LoadingContext.Consumer>

          <small>{response}</small>
        </InputContainer>
      )}
    </LanguageContext.Consumer>
  );
}

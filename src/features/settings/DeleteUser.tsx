/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { LoadingContext } from "../../app/App";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axios from "../../services/axios";
import { authLogout } from "../authentication/authSlice";
import { InputContainer } from "./style";

export default function DeleteUser() {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [msgEmail, setMsgEmail] = useState("");
  const [msgPassword, setMsgPassword] = useState("");

  function verify() {
    if (email !== user.email) {
      setMsgEmail("You must enter your registered email address");
    } else {
      setMsgEmail("");
    }

    if (password.length < 6 || password.length > 50) {
      setMsgPassword("You must enter a valid password");
    } else {
      setMsgPassword("");
    }
  }

  async function handleSubmit(setLoading: (status: string) => void) {
    verify();
    if (msgEmail && msgPassword) {
      setResponse("Check the fields above and try again.");
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
        }
      } else {
        setLoading("failure");
      }
    } catch (error: any) {
      setLoading("failure");
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => setResponse(err));
    }
  }

  return (
    <InputContainer>
      <h2>Delete user account</h2>
      <p>All of your data will be permanently deleted.</p>
      <p>Enter your email and password below and check the confirmation checkbox to proceed.</p>

      <LoadingContext.Consumer>
        {({setStatus}) => (
          <form>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={email}
              autoComplete="email" placeholder="your@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <small>{email && msgEmail}</small>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <small>{password && msgPassword}</small>

            <div className="select-if-update">
              <input type="checkbox" name="confirmation" id="confirmation" onChange={() => setConfirm(!confirm)}/>
              <p>I confirm this permanent deletion.</p>
            </div>

            <input type="submit" value="Confirm" disabled={!confirm} onClick={(e) => { e.preventDefault(); handleSubmit(setStatus); }} />
          </form>
        )}
      </LoadingContext.Consumer>

      <small>{response}</small>
    </InputContainer>
  );
}

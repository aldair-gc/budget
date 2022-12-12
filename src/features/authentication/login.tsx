/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import isEmail from "validator/lib/isEmail";
import { LoadingContext } from "../../app/App";
import { useAppDispatch } from "../../app/hooks";
import axios from "../../services/axios";
import { authFailure, authSuccess } from "./authSlice";
import { InputContainer } from "./style";

export default function Login(props: { position: (arg0: number) => void; }) {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [msgEmail, setMsgEmail] = useState("");
  const [msgPassword, setMsgPassword] = useState("");

  function verify() {
    if (!isEmail(email)) {
      setMsgEmail("You must enter a valid email address");
    } else {
      setMsgEmail("");
    }

    if (password.length < 6 || password.length > 50) {
      setMsgPassword("You must enter a valid password");
    } else {
      setMsgPassword("");
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>, setStatus: (status: "idle" | "loading" | "success" | "failure") => void) {
    e.preventDefault();
    verify();
    if (msgEmail && msgPassword) {
      setResponse("Check the fields above and try again.");
      return;
    }

    try {
      setStatus("loading");
      const loginRequest = await axios.post("/token", { email, password });
      if (loginRequest.data.token) {
        dispatch(authSuccess(loginRequest.data));
        axios.defaults.headers.common["Authorization"] = `Bearer ${loginRequest.data.token}`;
        setResponse("User logged in");
        setStatus("success");
      } else {
        dispatch(authFailure());
        setResponse("Authentication failure");
        setStatus("failure");
      }
    } catch (error: any) {
      setStatus("failure");
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => setResponse(err));
    }
  }

  return (
    <LoadingContext.Consumer>
      {({setStatus}) => (
        <InputContainer>
          <h2>Login</h2>

          <form onSubmit={(e) => handleSubmit(e, setStatus)}>
            <label htmlFor="login-email">Email</label>
            <input type="email" name="login-email" id="login-email"
              autoComplete="email" placeholder="your@email.com" required
              onChange={(e) => setEmail(e.target.value)}
            />
            <small>{msgEmail}</small>

            <label htmlFor="login-password">Password</label>
            <input type="password" name="login-password" id="login-password"
              autoComplete="current-password" placeholder="*****" required
              onChange={(e) => setPassword(e.target.value)}
            />
            <small>{msgPassword}</small>

            <input type="submit" value="Login" />
          </form>

          <h3 onClick={() => props.position(2)}>Register new user</h3>
          <small>{response}</small>

        </InputContainer>
      )}
    </LoadingContext.Consumer>
  );
}

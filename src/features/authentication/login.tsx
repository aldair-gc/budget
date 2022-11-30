/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import isEmail from "validator/lib/isEmail";
import { useAppDispatch } from "../../app/hooks";
import axios from "../../services/axios";
import { authFailure, authSuccess } from "./authSlice";
import { InputContainer } from "./style";

export default function Login(props: { position: (arg0: number) => void; }) {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let formErrors = false;
    const emailMsg = (document.querySelector("#email") as HTMLElement).nextElementSibling as HTMLElement;
    const passwordMsg = (document.querySelector("#password") as HTMLElement).nextElementSibling as HTMLElement;

    if (!isEmail(email)) {
      formErrors = true;
      emailMsg.innerHTML = "You must enter a valid email address";
      emailMsg.classList.remove("transparent");
    } else {
      emailMsg.classList.add("transparent");
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      passwordMsg.innerHTML = "Password must have at least 6 characters";
      passwordMsg.classList.remove("transparent");
    } else {
      passwordMsg.classList.add("transparent");
    }

    if (formErrors) return;

    try {
      const loginRequest = await axios.post("/token", { email, password });
      if (loginRequest.data.token) {
        dispatch(authSuccess(loginRequest.data));
        axios.defaults.headers.common["Authorization"] = `Bearer ${loginRequest.data.token}`;
        setResponse("User logged in");
      } else {
        dispatch(authFailure());
        setResponse("Authentication failure");
      }
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => setResponse(err));
    }
  }

  return (
    <InputContainer>
      <h1>Login</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="login-email">Email</label>
        <input type="email" name="login-email" id="login-email" onChange={(e) => setEmail(e.target.value)} />
        <small className="input-message transparent">Message</small>

        <label htmlFor="login-password">Password</label>
        <input type="password" name="login-password" id="login-password" onChange={(e) => setPassword(e.target.value)} />
        <small className="input-message transparent">Message</small>

        <input type="submit" value="Login" />
      </form>

      <h2 onClick={() => props.position(2)}>Register new user</h2>
    </InputContainer>
  );
}

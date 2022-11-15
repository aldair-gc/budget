import { FormEvent, useState } from "react";
import isEmail from "validator/lib/isEmail";
import { useAppDispatch } from "../../app/hooks";
import axios from "../../services/axios";
import { authFailure, authSuccess } from "./authSlice";
import "./style.css";

export default function Login() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let formErrors = false;
    const emailMsg = (document.querySelector("#email") as HTMLElement).nextElementSibling!;
    const passwordMsg = (document.querySelector("#password") as HTMLElement).nextElementSibling!;

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
        console.log("User logged in");
      } else {
        dispatch(authFailure());
        console.log("User login failure");
      }
    } catch (error) {
      const errors = error.response.data.errors ?? [];
      errors.map((err) => console.log(err));
    }
  }

  return (
    <div>
      <div className="user-container">
        <form onSubmit={(e) => handleSubmit(e)}>

          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
          <small className="input-message transparent">Message</small>

          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
          <small className="input-message transparent">Message</small>

          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}

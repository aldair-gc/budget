/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import isEmail from "validator/lib/isEmail";
import axios from "../../services/axios";
import { InputContainer } from "./style";

export default function Register(props: { position: (arg0: number) => void; }) {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let formErrors = false;
    const nameMsg = (document.querySelector("#name") as HTMLElement).nextElementSibling as HTMLElement;
    const emailMsg = (document.querySelector("#email") as HTMLElement).nextElementSibling as HTMLElement;
    const passwordMsg = (document.querySelector("#password") as HTMLElement).nextElementSibling as HTMLElement;

    if (inputName === "") {
      formErrors = true;
      nameMsg.innerHTML ="You must enter your name";
      nameMsg.classList.remove("transparent");
    } else {
      nameMsg.classList.add("transparent");
    }

    if (!isEmail(inputEmail)) {
      formErrors = true;
      emailMsg.innerHTML = "You must enter a valid email address";
      emailMsg.classList.remove("transparent");
    } else {
      emailMsg.classList.add("transparent");
    }

    if (inputPassword.length < 6 || inputPassword.length > 50) {
      formErrors = true;
      passwordMsg.innerHTML = "Password must have at least 6 characters";
      passwordMsg.classList.remove("transparent");
    } else {
      passwordMsg.classList.add("transparent");
    }

    if (formErrors) return;

    try {
      const registerRequest = await axios.post("/user", { inputName, inputEmail, inputPassword });
      if (registerRequest.status === 200) {
        console.log("User registered");
      } else {
        console.log("User register failure");
      }
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  }

  return (
    <InputContainer>
      <h1>Register</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={(e) => setInputName(e.target.value)}/>
        <small className="input-message transparent">Message</small>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={(e) => setInputEmail(e.target.value)} />
        <small className="input-message transparent">Message</small>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={(e) => setInputPassword(e.target.value)} />
        <small className="input-message transparent">Message</small>

        <input type="submit" value="Create" />
      </form>

      <h2 onClick={() => props.position(1)}>Login registered user</h2>
    </InputContainer>
  );
}

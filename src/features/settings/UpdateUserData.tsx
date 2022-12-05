/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import isEmail from "validator/lib/isEmail";
import Logo from "../../common/Logo/Logo";
import axios from "../../services/axios";
import { InputContainer } from "../authentication/style";

export default function Register(props: { position: (arg0: number) => void; }) {
  const [name, setName] = useState({active: false, value: ""});
  const [email, setEmail] = useState({active: false, value: ""});
  const [password, setPassword] = useState({active: false, value: ""});
  const [response, setResponse] = useState("");
  const [msgName, setMsgName] = useState("");
  const [msgEmail, setMsgEmail] = useState("");
  const [msgPassword, setMsgPassword] = useState("");

  function verify() {
    if (name.value === "") {
      setMsgName("You must enter your name");
    } else {
      setMsgName("");
    }

    if (!isEmail(email.value)) {
      setMsgEmail("You must enter a valid email address");
    } else {
      setMsgEmail("");
    }

    if (password.value.length < 6 || password.value.length > 50) {
      setMsgPassword("You must enter a valid password");
    } else {
      setMsgPassword("");
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    verify();
    if (msgName && msgEmail && msgPassword) {
      setResponse("Check the fields above and try again.");
      return;
    }
    const fieldsSelected = {};
    name.active && Object.defineProperty(fieldsSelected, "name", name.value);
    email.active && Object.defineProperty(fieldsSelected, "email", email.value);
    password.active && Object.defineProperty(fieldsSelected, "password", password.value);

    if (name.active || email.active || password.active) try {
      const registerRequest = await axios.put("/user", fieldsSelected);
      if (registerRequest.status === 200) {
        //call message result
      } else {
        //call message result
      }
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => setResponse(err));
    }
  }

  return (
    <InputContainer>
      <Logo/>
      <h2>Register</h2>

      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name"
          autoComplete="name" placeholder="Your Name" required
          onChange={(e) => setName({active: true, value: e.target.value})}
        />
        <small>{msgName}</small>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email"
          autoComplete="email" placeholder="your@email.com" required
          onChange={(e) => setEmail({active: true, value: e.target.value})}
        />
        <small>{msgEmail}</small>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password"
          autoComplete="new-password" placeholder="*****" required
          onChange={(e) => setPassword({active: true, value: e.target.value})}
        />
        <small>{msgPassword}</small>

        <input type="submit" value="Create" />

      </form>

      <h3 onClick={() => props.position(1)}>Login registered user</h3>
      <small>{response}</small>
    </InputContainer>
  );
}

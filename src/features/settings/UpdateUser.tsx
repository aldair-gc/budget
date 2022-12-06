/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import { LoadingContext } from "../../app/App";
import axios from "../../services/axios";
import { InputContainer } from "../authentication/style";

export default function UpdateUser() {
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

  async function handleSubmit(setLoading: (status: string) => void) {
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
      setLoading("loading");
      const registerRequest = await axios.put("/user", fieldsSelected);
      if (registerRequest.status === 200) {
        setLoading("success");
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
    <LoadingContext.Consumer>
      {({setStatus}) => (
        <InputContainer>
          <h2>Update</h2>

          <form>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={name.value}
              autoComplete="name" placeholder="Your Name"
              onChange={(e) => setName({active: true, value: e.target.value})}
            />
            <small>{msgName}</small>

            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={email.value}
              autoComplete="email" placeholder="your@email.com"
              onChange={(e) => setEmail({active: true, value: e.target.value})}
            />
            <small>{msgEmail}</small>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={password.value}
              autoComplete="new-password" placeholder="*****"
              onChange={(e) => setPassword({active: true, value: e.target.value})}
            />
            <small>{msgPassword}</small>

            <input type="submit" value="Create" onClick={() => handleSubmit(setStatus)} />
          </form>

          <small>{response}</small>
        </InputContainer>
      )}
    </LoadingContext.Consumer>

  );
}

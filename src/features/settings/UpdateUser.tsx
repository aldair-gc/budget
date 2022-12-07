/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import { LoadingContext } from "../../app/App";
import { useAppSelector } from "../../app/hooks";
import axios from "../../services/axios";
import { InputContainer } from "../authentication/style";

export default function UpdateUser() {
  const user = useAppSelector(state => state.auth.user);

  const [name, setName] = useState({active: false, value: user.name});
  const [email, setEmail] = useState({active: false, value: user.email});
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
    name.active && Object.defineProperty(fieldsSelected, "name", { value: name.value });
    email.active && Object.defineProperty(fieldsSelected, "email", { value: email.value });
    password.active && Object.defineProperty(fieldsSelected, "password", { value: password.value });

    if (name.active || email.active || password.active) try {
      console.log(fieldsSelected);
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
    <InputContainer>
      <h2>Update</h2>
      <p>Select what you want to update</p>

      <LoadingContext.Consumer>
        {({setStatus}) => (
          <form>
            <label htmlFor="name">Name</label>
            <div className="select-if-update">
              <input
                type="checkbox" name="nameSelect" id="nameSelect" defaultChecked={name.active}
                onChange={(e) => setName({active: e.target.checked, value: name.value})}
              />

              <input
                type="text" name="name" id="name" value={name.value}
                autoComplete="name" placeholder="Your Name" disabled={!name.active}
                onChange={(e) => setName({active: true, value: e.target.value})}
              />
            </div>
            <small>{msgName}</small>

            <label htmlFor="email">Email</label>
            <div className="select-if-updade">
              <input
                type="checkbox" name="emailSelect" id="emailSelect" defaultChecked={email.active}
                onChange={(e) => setEmail({active: e.target.checked, value: name.value})}
              />
              <input type="email" name="email" id="email" value={email.value}
                autoComplete="email" placeholder="your@email.com" disabled={!email.active}
                onChange={(e) => setEmail({active: true, value: e.target.value})}
              />
            </div>
            <small>{msgEmail}</small>

            <label htmlFor="password">Password</label>
            <div className="update">
              <input
                type="checkbox" name="passwordSelect" id="passwordSelect" defaultChecked={password.active}
                onChange={(e) => setPassword({active: e.target.checked, value: name.value})}
              />
              <input type="password" name="password" id="password" value={password.value}
                autoComplete="new-password" placeholder="*****" disabled={!password.active}
                onChange={(e) => setPassword({active: true, value: e.target.value})}
              />
            </div>
            <small>{msgPassword}</small>

            <input type="submit" value="Confirm" onClick={(e) => {
              e.preventDefault();
              handleSubmit(setStatus);
            }} />
          </form>
        )}
      </LoadingContext.Consumer>

      <small>{response}</small>
    </InputContainer>
  );
}

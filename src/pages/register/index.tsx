import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import "./style.css";

export default function Register() {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let formErrors = false;

    if (inputName === "") {
      formErrors = true;
      toast.error("You must enter your name");
    }

    if (!isEmail(inputEmail)) {
      formErrors = true;
      toast.error("You must enter a valid email address");
    }

    if (inputPassword.length < 6 || inputPassword.length > 50) {
      formErrors = true;
      toast.error("You must enter a password between 6 and 50 characters");
    }

    if (formErrors) return;


  }

  return (
    <div>
      <div className="header-container">Budget</div>
      <div className="title-container">Register</div>

      <div className="user-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={(e) => setInputName(e.target.value)}/>

          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={(e) => setInputEmail(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={(e) => setInputPassword(e.target.value)} />

          <input type="submit" value="Create" />
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { validate } from "email-validator";
import "./Register.css";

export default function Register(props) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [inputErrors, setInputErrors] = useState({});
  const [registerError, setRegisterError] = useState("");

  const { changeRoute, addUser } = props;

  function updateUserData(event) {
    const { name, value } = event.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleRegisterError(data) {
    setRegisterError(data);
  }

  function validateInputs(userData) {
    const { name, email, password } = userData;
    const inputErrors = {};

    if (!name) {
      inputErrors.name = "Name is required!";
    }

    if (!email) {
      inputErrors.email = "Email is required!";
    } else if (!validate(email)) {
      inputErrors.email = "Not a valid email format!";
    }

    if (!password) {
      inputErrors.password = "Password is required!";
    } else if (password.length < 8) {
      inputErrors.password = "Password must contain at least 8 characters!";
    }

    setInputErrors(inputErrors);

    return inputErrors;
  }

  function handleRegister() {
    const inputErrors = validateInputs(userData);
    const inputsAreValid = !Object.keys(inputErrors).length;

    if (inputsAreValid) {
      fetch("https://fra-server.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            changeRoute("home");
            addUser(data);
            console.log("register log", data);
          } else {
            handleRegisterError(data);
          }
        })
        .catch(console.log);
    } else {
      handleRegisterError("");
      console.log("inputs not valid");
    }
  }

  function handleEnterKeypress(event) {
    if (event.key === "Enter") {
      handleRegister();
    }
  }

  return (
    <main className="register">
      <form>
        <fieldset className="register-fieldset">
          <legend className="register-title">Register</legend>
          <div className="register-inputs center f-column">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
              type="text"
              value={userData.name}
              onChange={updateUserData}
              onKeyDown={handleEnterKeypress}
            />
            {inputErrors.name && (
              <p className="error-message">{inputErrors.name}</p>
            )}
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              value={userData.email}
              onChange={updateUserData}
              onKeyDown={handleEnterKeypress}
            />
            {inputErrors.email && (
              <p className="error-message">{inputErrors.email}</p>
            )}
            {registerError && <p className="error-message">{registerError}</p>}
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              value={userData.password}
              onChange={updateUserData}
              onKeyDown={handleEnterKeypress}
            />
            {inputErrors.password && (
              <p className="error-message">{inputErrors.password}</p>
            )}
          </div>
          <div className="register-buttons center f-column">
            <p onClick={handleRegister}>Register</p>
            <p onClick={() => changeRoute("signIn")}>Sign In</p>
          </div>
        </fieldset>
      </form>
    </main>
  );
}

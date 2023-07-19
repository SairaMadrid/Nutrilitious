import React from "react";
import { useState, useEffect } from "react";
//import axios from "axios";
//import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = credentials;

  const auth = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      await auth.login(credentials);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        value={email}
        onChange={handleChange}
        name="email"
        type="text"
        className="form-control mb-2"
      />
      <input
        value={password}
        onChange={handleChange}
        name="password"
        type="password"
        className="form-control mb-2"
      />
      <div className="d-flex gap-2 justify-content-center">
        <button className="" onClick={login}>
          Log in
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { useState, useEffect } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const { email, password } = credentials;
  const navigate = useNavigate();

  const auth = useAuth();

  const handleEmailChange = (e) => {
    setCredentials({ ...credentials, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setCredentials({ ...credentials, password: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    //if no credentials set an error later
    try {
      await auth.login(credentials);
      setCredentials({ email: "", password: "" });
      navigate("/profile");
    } catch (error) {
      throw error; //handle errors -> response.data.message?
    }
  };

  return (
    <div className="container text-center">
      <h1 className="pb-4">Welcome Back!</h1>
      <div className="row">
        <form action="" onSubmit={handleLogin}>
          <div className="col-sm-4 offset-sm-4 mt-2 mb-4">
            <label className="form-label start">Email</label>
            <div className="form-floating">
              <input
                className="form-control"
                value={email}
                onChange={handleEmailChange}
                name="username"
                type="text"
                placeholder="email"
              />
              <label className="form-label text-sm">Enter Email</label>
            </div>
          </div>
          <div className="col-sm-4 offset-sm-4 my-3">
            <label className="form-label start">Password</label>
            <div className="form-floating">
              <input
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
                name="password"
                type="password"
                placeholder="password"
              />
              <label className="form-label text-sm">Enter Password</label>
            </div>
          </div>
          <p>
            <a className="link" href="#">
              Forgot password?
            </a>
          </p>

          <button
            className="btn btn-success my-2 py-2 col-12 col-sm-4"
            onClick={handleLogin}
          >
            Sign in<i className="fa-solid fa-arrow-right ms-3"></i>
          </button>
        </form>
      </div>
      <p className="py-3">
        Don't have an account?
        <a className="link" href="/register">
          Sign up
        </a>
      </p>
    </div>
  );
}

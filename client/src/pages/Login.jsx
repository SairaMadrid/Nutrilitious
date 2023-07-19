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
    <div className="container text-center">
      <h1 className="pb-4">Welcome Back!</h1>
      <div className="row">
        <form action="" onSubmit={handleChange}>
          <div className="col-sm-4 offset-sm-4 mt-2 mb-4">
            <label className="form-label start">Email</label>
            <div className="form-floating">
              <input
                className="form-control"
                value={email}
                onChange={handleChange}
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
                onChange={handleChange}
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
            onClick={handleChange}
          >
            Sign in<i className="fa-solid fa-arrow-right ms-3"></i>
          </button>
        </form>
      </div>
      <p className="py-3">
        Don't have an account?{" "}
        <a className="link" href="/register">
          Sign up
        </a>
      </p>
    </div>
  );
}

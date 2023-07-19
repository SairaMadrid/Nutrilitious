import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useAuth()
  const auth = useAuth();

const handleChange = (e) => {
  e.persist();
  auth.setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
};

const handleRegister = async () => {
  if (!user.first_name || 
      !user.last_name || 
      !user.email || 
      !user.password || 
      !user.preference || 
      !user.cooking_skills || 
      !user.description) {
    setErrorMessage("Please fill out all fields");
  } else {
    try {
      await auth.register();
      auth.setUser({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      preference: "",
      cooking_skills: "",
      description: "",
      });
      setErrorMessage("");
    } catch (error) {
      throw new Error(error);
    }
  }
 
}

  return (
    <div className="container text-center">
      <h1 className="pb-4">Sign up here!</h1>

      <label className="">First name</label>

      <input
        className=""
        value={auth.user.first_name}
        onChange={handleChange}
        name="first_name"
        type="text"
        placeholder="First name"
      />

      <label className="">Last name</label>
      <input
        className=""
        value={auth.user.last_name}
        onChange={handleChange}
        name="last_name"
        type="text"
        placeholder="Last name"
      />

      <label className="">Email</label>
      <input
        className=""
        value={auth.user.email}
        onChange={handleChange}
        name="email"
        type="text"
        placeholder="email"
      />

      <label className="">Password</label>
      <input
        className=""
        value={auth.user.password}
        onChange={handleChange}
        name="password"
        type="password"
        placeholder="Choose a strong password"
      />

      <label className="">Preference</label>
      <input
        className=""
        value={auth.user.preference}
        onChange={handleChange}
        name="preference"
        type="text"
        placeholder="Any dietary requirements?"
      />

      <label className="">Cooking Skills</label>
      <input
        className=""
        value={auth.user.cooking_skills}
        onChange={handleChange}
        name="cooking_skills"
        type="text"
        placeholder="How good are you at cooking?"
      />

      <label className="">Description</label>
      <input
        className=""
        value={auth.user.description}
        onChange={handleChange}
        name="description"
        type="text"
        placeholder="Tell us something about yourself"
      />

      <button className="btn btn-success" onClick={handleRegister}>
        Sign up
      </button>
      <br />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

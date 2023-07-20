import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import "./register.css";
import PasswordInput from "../components/PasswordInput";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useAuth();
  const auth = useAuth();
  const [cookingSkills, setCookingSkills] = useState("");

  const handleSkillsChange = (e) => {
    e.persist();
    if (e.target.name === "cooking_skills") {
      setCookingSkills(e.target.value);
    } else {
      auth.setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
    }
  };

  const handleChange = (e) => {
    e.persist();
    console.log("test");
    auth.setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    if (
      !user.first_name ||
      !user.last_name ||
      !user.email ||
      !user.password ||
      !user.preference ||
      !user.cooking_skills ||
      !user.description
    ) {
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
  };

  return (
    <div className="container text-center">
      <h3 className="pb-4">Sign up here!</h3>

      <label className="">First name</label>
      <input
        className="register-input"
        value={auth.user.first_name}
        onChange={handleChange}
        name="first_name"
        type="text"
        placeholder="First name"
      />

      <label className="">Last name</label>
      <input
        className="register-input"
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
        placeholder="Email"
      />

      <label className="">Password</label>
      <PasswordInput value={auth.user.password} onChange={handleChange} />

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
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            name="cooking_skills"
            value="novice"
            checked={cookingSkills === "novice"}
            onChange={handleSkillsChange}
          />
          Novice chef
        </label>
        <label>
          <input
            type="checkbox"
            name="cooking_skills"
            value="hobby"
            checked={cookingSkills === "hobby"}
            onChange={handleSkillsChange}
          />
          Hobby chef
        </label>
        <label>
          <input
            type="checkbox"
            name="cooking_skills"
            value="competent"
            checked={cookingSkills === "competent"}
            onChange={handleSkillsChange}
          />
          Competent chef
        </label>
        <label>
          <input
            type="checkbox"
            name="cooking_skills"
            value="expert"
            checked={cookingSkills === "expert"}
            onChange={handleSkillsChange}
          />
          Expert chef
        </label>
      </div>

      <label className="">Description</label>
      <input
        className=""
        value={auth.user.description}
        onChange={handleSkillsChange}
        name="description"
        type="text"
        placeholder="Tell us something about yourself"
      />

      <button className="register-button" onClick={handleRegister}>
        Sign up
      </button>
      <br />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

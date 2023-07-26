import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import PasswordInput from "../components/PasswordInput";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    preferences: "",
    cooking_skills: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  /*  const handleSkillsChange = (e) => {
    e.persist();
    if (e.target.name === "cooking_skills") {
      setCookingSkills(e.target.value);
    } else {
      setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
    }
  }; */
  const handleSkillsChange = (e) => {
    const { name, value, checked, type } = e.target; //here we are doing an object destructuring so that instead of typing e.target.value we can simply type 'value' and so on
    if (type === "checkbox") {
      //I think the reason why this function wasnt updating the user state was because we are using a specific type of input, checkbox, so it's treated a little bit different from a regular input
      //in this if statement we check if the type of the input is checkbox
      setUser((state) => ({
        ...state,
        [name]: checked ? value : "", //if it is a checkbox and if it was checked (clicked) then e.target.name equals to value. In our case, it's either "novice" or the others names we gave them. If it's not checked, we're clearing the value and setting it to an empty string
      }));
    } else {
      //this will handle the case when the input's type is not a checkbox. Then it will set the input value with whatever the user typed in
      setUser((state) => ({
        ...state,
        [name]: value,
      }));
    }
  };

  /*  const handlePasswordChange = (e) => {
    e.persist();
    setPassword(e.target.value); // Update the password state
  }; */

  const handleChange = (e) => {
    e.persist();
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const register = async () => {
    try {
      await axios.post("/api/auth/register", user);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRegister = async () => {
    if (
      !user.first_name ||
      !user.last_name ||
      !user.email ||
      !user.password ||
      !user.preferences ||
      !user.description
    ) {
      setErrorMessage("Please fill out all fields");
    } else {
      try {
        await register();
        setUser({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          preferences: "",
          description: "",
        });
        setErrorMessage("");
      } catch (error) {
        console.log(error.message);
        setErrorMessage("There was an error, please try again");
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="register-container text-left">
      <h3 className="register-header">Create an account</h3>
      <h5 className="pb-4">
        Let's help you set up an account, it won't take long.
      </h5>
      <div className="col-sm-4 offset-sm-4 mt-2 mb-4"></div>
      <label className="form-label start">First name</label>
      <div className="form-floating">
        <input
          className="form-control"
          value={user.first_name}
          onChange={handleChange}
          name="first_name"
          type="text"
          placeholder="First name"
        />
        <label className="form-label text-sm">Enter first name</label>
      </div>

      <div className="col-sm-4 offset-sm-4 mt-2 mb-4"></div>
      <label className="form-label start">Last name</label>
      <div className="form-floating">
        <input
          className="form-control"
          value={user.last_name}
          onChange={handleChange}
          name="last_name"
          type="text"
          placeholder="Last name"
        />
        <label className="form-label text-sm">Enter last name</label>
      </div>

      <div className="col-sm-4 offset-sm-4 mt-2 mb-4"></div>
      <label className="form-label start">Email</label>
      <div className="form-floating">
        <input
          className="form-control"
          value={user.email}
          onChange={handleChange}
          name="email"
          type="text"
          placeholder="Email"
        />
        <label className="form-label text-sm">Enter email</label>
      </div>

      <div className="col-sm-4 offset-sm-4 mt-2 mb-4"></div>
      <label className="form-label start">Password</label>
      <div className="form-floating">
        {/*   <PasswordInput
  value={user.password}
  onChange={handlePasswordChange}
      /> */}
        <label className="form-label text-sm">Enter password</label>
        <div className="input-group mb-6">
          <input
            className="register-input form-control passInput"
            value={user.password}
            onChange={handleChange}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder=""
          />

          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-secondary eyebutton mx-2 px-2 py-2"
              onClick={handleTogglePassword}
            >
              {showPassword ? (
                <i className="bi bi-eye-fill"></i>
              ) : (
                <i className="bi bi-eye-slash-fill"></i>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="col-sm-4 offset-sm-4 mt-2 mb-4"></div>
      <label className="form-label start">Preferences</label>
      <div className="form-floating">
        <input
          className="form-control"
          value={user.preferences}
          onChange={handleChange}
          name="preferences"
          type="text"
          placeholder=""
        />
        <label className="form-label text-sm">Enter dietary preferences</label>
      </div>
      <label className="">Cooking Skills</label>
      <div className="checkbox-container ps-2">
        <label>
          <input
            type="checkbox"
            name="cooking_skills"
            value="Novice"
            checked={user.cooking_skills === "Novice"}
            onChange={handleSkillsChange}
          />
          Novice chef
        </label>
        <label>
          <input
            type="checkbox"
            name="cooking_skills"
            value="Hobby"
            checked={user.cooking_skills === "Hobby"}
            onChange={handleSkillsChange}
          />
          Hobby chef
        </label>
        <label>
          <input
            type="checkbox"
            name="cooking_skills"
            value="Competent"
            checked={user.cooking_skills === "Competent"}
            onChange={handleSkillsChange}
          />
          Competent chef
        </label>
        <label>
          <input
            type="checkbox"
            name="cooking_skills"
            value="Expert"
            checked={user.cooking_skills === "Expert"}
            onChange={handleSkillsChange}
          />
          Expert chef
        </label>
      </div>
      <div className="col-sm-4 offset-sm-4 mt-2 mb-4"></div>
      <label className="form-label start">Description</label>
      <div className="form-floating">
        <input
          className="form-control"
          value={user.description}
          onChange={handleChange}
          name="description"
          type="text"
          placeholder=""
        />

        <label className="form-label text-sm">Describe yourself</label>
      </div>
      <br></br>
      <button
        className="btn btn-success my-2 py-2 col-12 col-sm-4"
        onClick={handleRegister}
      >
        Sign up<i className="fa-solid fa-arrow-right ms-3"></i>
      </button>
      <p className="py-3">
        Already a member?
        <a className="link" href="/login">
          {" "}
          Sign in
        </a>
      </p>
      <br />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

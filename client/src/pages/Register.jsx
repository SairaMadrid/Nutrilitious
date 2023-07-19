import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({
    first_name: "test",
    last_name: "test",
    email: "test",
    password: "test",
    preference: "test",
    cooking_skills: "test",
    description: "test",
  });
}

const navigate = useNavigate();

const handleChange = (e) => {
  e.persist();
  setUser((state) => ({ ...state, [e.target.name]: e.target.value }));

  const register = () => {
    axios("/api/auth/register", {
      method: "POST",
      data: user,
    })
      .then((result) => {
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Register</h1>

      <label className="">First name</label>
      <input
        className=""
        value={user.first_name}
        onChange={handleChange}
        name="first_name"
        type="text"
      />
      <label className="">Last name</label>
      <input
        className=""
        value={user.last_name}
        onChange={handleChange}
        name="last_name"
        type="text"
      />

      <label className="">Email</label>
      <input
        className=""
        value={user.email}
        onChange={handleChange}
        name="email"
        type="text"
      />

      <label className="">Password</label>
      <input
        className=""
        value={user.password}
        onChange={handleChange}
        name="password"
        type="password"
      />

      <label className="">Preference</label>
      <input
        className=""
        value={user.preference}
        onChange={handleChange}
        name="password"
        type="password"
      />

      <label className="">Cooking Skills</label>
      <input
        className=""
        value={user.cooking_skills}
        onChange={handleChange}
        name="cooking_skills"
        type="text"
      />

      <label className="">Description</label>
      <input
        className=""
        value={user.description}
        onChange={handleChange}
        name="description"
        type="text"
      />

      <button className="btn" onClick={handleChange}>
        Sign up
      </button>
    </div>
  );
};

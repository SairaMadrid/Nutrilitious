import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
const [userData, setUserData] = useState({
  first_name: "",
  last_name: "",
  cooking_skills: "",
  preference: "",
  description: ""
});
const [errorMessage, setErrorMessage] = useState("");
const navigate = useNavigate();

//logout in the navbar with the auth.js
const logout = () => {
  localStorage.removeItem("token");
  setUserData(null);
  navigate("/login");
};

useEffect(() => {
  const getProfile = async () => {
    try {
      const { data } = await axios('/api/auth/profile', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"), //whitespace after Bearer
        }
      });
      setUserData(data);
      setErrorMessage(""),
      console.log(data);
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error);
      }
  };
  getProfile()
}, []);
  

    return (
      <div>
      <button onClick={logout}>Sign out</button>
      <h1>Profile</h1>
      <h3>{`${userData.first_name} ${userData.last_name}`}</h3>
      <h4>{`${userData.cooking_skills}`}</h4>
      <p>{`${userData.description}`}</p>
      <div>
        <h2>My eating and cooking preferences</h2>
        <p>{`${userData.preference}`}</p>
      </div>
      </div>
  
    )
    
}

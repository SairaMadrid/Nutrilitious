import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {

 const [userData, setUserData] = useState({
  id: null,
  first_name: "",
  last_name: "",
  cooking_skills: "",
  preference: "",
  description: ""
});
const [errorMessage, setErrorMessage] = useState("");
const [output, setOutput] = useState("");
const [isTyping, setIsTyping] = useState(false);


const navigate = useNavigate();


  //logout in the navbar with the auth.js
  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/login");
  };

  const getProfile = async () => {
    try {
      const { data } = await axios("/api/auth/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"), //whitespace after Bearer
        },
      });
      setUserData(data);
      setErrorMessage(""), console.log(data);
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  getProfile()
}, []);



  const generateRecipe = async () => {
    try {
      const { data } = await axios(`/api/assistant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
      });
      if (!data) {
        throw new Error("Invalid response object");
      }
      const { output } = data;
      setOutput(output); 
      console.log(output);
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while fetching the response");
    }
  }
  

    return (
      <div className="container">
      <button className="btn btn-success" onClick={logout}>Sign out</button>

      <h1>Profile</h1>
      <h3>{`${userData.first_name} ${userData.last_name}`}</h3>
      <h5>{`${userData.cooking_skills}`}</h5>
      <p>{`${userData.description}`}</p>

      <div>
        <h3>My eating and cooking preferences</h3>
        <p>{`${userData.preference}`}</p>
      </div>

      <h3>Favourites</h3>
      <br />
<p>Click on the button below to ask NutriGPT, our AI nutrition assistant, to generate a simple yet delicious recipe based on your preferences!</p>
      <button className="btn btn-success" onClick={generateRecipe}>Inspire me!</button>
      {output && (
        <pre className="text">{output}</pre>
      )}
      </div>
  
    )
    

}

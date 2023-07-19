import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function Profile() {
 
  const [errorMessage, setErrorMessage] = useState("");
  const [output, setOutput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const auth = useAuth();

useEffect(() => {
  const getProfile = async () => {
    try {
      const { data } = await axios("/api/auth/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"), 
        },
      });
      auth.setUser(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error);
    }
  }
  getProfile();
}, []);

  const generateRecipe = async () => {
    try {
      const { data } = await axios(`/api/assistant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!data) {
        setIsTyping(false);
        throw new Error("Invalid response object");
      }
      const { output } = data;
      setIsTyping(true);
      setOutput(output);
      console.log(output);
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while fetching the response");
      setIsTyping(false);
    }
  };

  return (
    <div className="container">

      <h1>Profile</h1>
      <h3>{`${auth.user.first_name} ${auth.user.last_name}`}</h3>
      <h5>{`${auth.user.cooking_skills}`}</h5>
      <p>{`${auth.user.description}`}</p>

      <div>
        <h3>My eating and cooking preferences</h3>
        <p>{`${auth.user.preference}`}</p>
      </div>

      <h3>Favourites</h3>
      <br />
      <p>
        Click on the button below to ask NutriGPT, our AI nutrition assistant,
        to generate a simple yet delicious recipe based on your preferences!
      </p>
      <button className="btn btn-success" onClick={generateRecipe}>
        Inspire me!
      </button>
      {output && <pre className="text">{output}</pre>}
    </div>
  );
}

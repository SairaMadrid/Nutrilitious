import React, { useEffect, useState } from "react";
import axios from "axios";
import chef from "../assets/chef.jpg";
import UpdateProfile from "../components/UpdateProfile";

export default function Profile() {
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
  const [output, setOutput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios("/api/auth/profile", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setUser(data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
        console.log(error);
      }
    };
    getProfile();
  }, []);

  const generateRecipe = async () => {
    try {
      setIsTyping(true);
      const { data } = await axios(`/api/assistant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!data) {
        throw new Error("Invalid response object");
      }
      const { output } = data;
      setIsTyping(false);
      setOutput(output);
      console.log(output);
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while fetching the response");
    } finally {
      setIsTyping(false);
    }
  };

  const toggleForm = () => {
    setIsUpdating((prevState) => !prevState); // toggling the state of the form to update user profile here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        "/api/auth/profile",
        {
          description: user.description,
          preferences: user.preferences,
          cooking_skills: user.cooking_skills,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("profile updated successfully, yaaay!");
      setIsUpdating(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "sorry, but an error occurred while updating the profile"
      );
    }
  };

  return (
    <div className="container">
      <h1 className="text-center py-2">My Profile</h1>
      <div className="row pt-3">
        <div className="col-6 text-center">
          <img className="avatar" src={chef} alt="avatar" />
        </div>
        <div className="col-6 text-center mt-4">
          <h3>
            {user.first_name} {user.last_name}
          </h3>
        </div>
      </div>
      <br />
      {!isUpdating && (
        <div className="container py-2">
          <p className="text-desc" style={{ fontSize: "18px" }}>
            {user.cooking_skills} chef
          </p>
          <p className="text-desc">{user.description}</p>

          <div>
            <h4 className="my-2">My eating and cooking preferences</h4>
            <p className="text-desc">{user.preferences}</p>
          </div>
          <button className="btn btn-success my-2 px-4" onClick={toggleForm}>
            Edit Profile
          </button>
        </div>
      )}
      {isUpdating && (
        <UpdateProfile
          user={user}
          isUpdating={isUpdating}
          toggleForm={toggleForm}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          cookingSkills={user.cooking_skills}
        />
      )}
      <div style={{ marginTop: "3%" }}>
        <h4>Your Favorite Recipes:</h4>
        <div>...will be rendered here</div>
      </div>
      <br />
      <h4 className="my-2">Generate a recipe with NutriGPT</h4>
      <p className="text-bigger">
        Discover delightgul and healthy recipes personalized just for you! Click
        the button below to ask NutriGPT, our AI nutrition assistant, to
        generate a recipe that perfectly matches your cooking and eating
        preferences!
      </p>
      <button className="btn btn-success my-2 px-4" onClick={generateRecipe}>
        Inspire me!
      </button>
      <span className="my-2">
        <div className={isTyping ? "typing" : "hide"}>
          <p>
            <i>{isTyping ? "Typing..." : ""}</i>
          </p>
        </div>
      </span>
      <div className="py-2 my-1">
        {output && <pre className="text">{output}</pre>}
      </div>
    </div>
  );
}

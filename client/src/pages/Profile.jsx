import React, { useEffect, useState } from "react";
import axios from "axios";
import chef from "../assets/chef.jpg";
import UpdateProfile from "../components/UpdateProfile";
import GPTBot from "../components/GPTBot";

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

  // need a fetch request here to access the favourites data from our DB and display images and titles/names here in clickable cards

  // when clicked on a favourite card... it should display a smaller version of the the RecipeCard.jsx... need to pass on all necessary data / recipeID for that
  // conditional rendering to only display either all favourites or just one recipe
  // needs to be similar to Search component... need to have a similar to recipe, setRecipe useState... so that the button to go back works and will lead back to favourites in this case

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
        <div>...will be rendered here through a seperate component</div>{" "}
        {/* by clicking on one of the favourites, it will open a smaller but full recipe card which can also lead you back to the favourites, just need a slightly adapted version of the other recipe card */}
      </div>
      <br />
      <GPTBot />
    </div>
  );
}

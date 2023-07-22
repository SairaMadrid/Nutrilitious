import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RecipeCard({ recipe, setRecipe }) {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [cookingTime, setCookingTime] = useState(0);
  const [servingSize, setServingSize] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [isFav, setIsFav] = useState(false);
  const [userID, setUserID] = useState("");

  const { title } = recipe;

  //fetching necessary userID for favourites function as well as recipe description and ingredients below
  useEffect(() => {
    const getUserID = async () => {
      try {
        const { data } = await axios("/api/auth/profile", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setUserID(data.id);
      } catch (error) {
        console.log(error);
      }
    };

    const getRecipeDescription = async () => {
      try {
        const response = await fetch(`/api/recipe/?id=${recipe.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setImageURL(data.image);
        setCookingTime(data.readyInMinutes);
        setServingSize(data.servings);
        setInstructions(data.instructions);
        // Accessing the ingredients array
        if (data.extendedIngredients && data.extendedIngredients.length > 0) {
          const ingredients = data.extendedIngredients.map(
            (ingredient) => ingredient.original
          );
          setIngredients(ingredients);
        }
      } catch (error) {
        console.error("Error fetching recipe description:", error);
      }
    };
    getUserID();
    getRecipeDescription();
    console.log(userID);
  }, [recipe]);

  const handleButtonClick = () => {
    setRecipe({});
  };

  const handleHeartClick = () => {
    setIsFav((prevIsFav) => !prevIsFav);

    console.log(isFav);
  };

  useEffect(() => {
    const addToFavorites = async (recipeId, name, image, userID) => {
      console.log("Recipe added to favourites with ID:", recipeId);
      // we need to add logic to add the recipe to favourites with the given recipeId, name/title, and image
      // for that we first need to store in favourites table in backend and also send the userID
      const newFavourite = {
        name: name,
        image: image,
        profiles_id: userID,
        api_id: recipe.id,
      };
      try {
        const response = await fetch(`/api/favourites`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFavourite),
        });
      } catch (error) {
        console.error("Error adding to favourites:", error);
      }
    };

    if (isFav) {
      addToFavorites(recipe.id, title, imageURL, userID);
    }
  }, [isFav, recipe.id, title, imageURL, userID]);

  return (
    <>
      <h2>Here Is Your {title} Recipe</h2>
      <div className="card" style={{ width: "35em", height: "auto" }}>
        <div style={{ textAlign: "center", marginTop: "3%" }}>
          <img
            className="card-img-top"
            src={imageURL}
            style={{ width: "30em", height: "auto" }}
            alt={`Image of ${title}`}
          />
        </div>
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <h5>Ingredients:</h5>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h5>Instructions:</h5>
          <div
            className="card-text"
            dangerouslySetInnerHTML={{ __html: instructions }} //This line I asked ChatGPT about and it works well
          ></div>
          <div className="card-text" style={{ marginTop: "2%" }}>
            <h6>
              Cooking Time:{" "}
              <span
                style={{ fontSize: "15px", fontFamily: "'Karla', sans-serif" }}
              >
                {cookingTime} minutes
              </span>
            </h6>
          </div>
          <h6>
            Serving Size:{" "}
            <span
              style={{ fontSize: "15px", fontFamily: "'Karla', sans-serif" }}
            >
              {servingSize}
            </span>
          </h6>
          <div className="heart-icon">
            <i
              onClick={handleHeartClick}
              className="fas fa-heart"
              style={{ color: isFav ? "red" : "inherit" }}
            ></i>
          </div>
        </div>
      </div>
      <button onClick={handleButtonClick}>Back to the overview</button>
    </>
  );
}

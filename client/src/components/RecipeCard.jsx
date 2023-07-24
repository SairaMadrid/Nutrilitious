import { React, useState, useEffect } from "react";

export default function RecipeCard({
  recipe,
  setRecipe,
  setFavouriteCard,
  recipeFavourites,
}) {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [cookingTime, setCookingTime] = useState(0);
  const [servingSize, setServingSize] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [isFav, setIsFav] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const name = recipe.name || recipe.title;

  useEffect(() => {
    console.log(recipeFavourites);
    if (recipeFavourites && recipeFavourites.length > 0) {
      for (let x of recipeFavourites) {
        if (x.api_id === recipe.api_id) {
          setIsFav(true);
          break;
        }
      }
    }
    console.log(isFav);
  }, [recipeFavourites, recipe.api_id, isFav]);

  //fetching recipe description and ingredients below
  useEffect(() => {
    const foodID = recipe.api_id || recipe.id;
    const getRecipeDescription = async () => {
      try {
        const response = await fetch(`/api/recipe/?id=${foodID}`, {
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
    // check if the heart of the favourites should be set to active/red or not!!!!!!!!!!!!!!!!!!!

    getRecipeDescription();
  }, [recipe]);

  const handleButtonClick = () => {
    if (setRecipe) {
      setRecipe({});
    }
    if (setFavouriteCard) {
      setFavouriteCard(false);
    }
  };

  const handleHeartClick = () => {
    setIsFav((prevIsFav) => !prevIsFav);
    setIsHeartClicked(true);
  };

  useEffect(() => {
    const addToFavorites = async () => {
      // we need to add logic to add the recipe to favourites with the given recipeId, name/name, and image
      // for that we first need to store in favourites table in backend
      const newFavourite = {
        name: name,
        image: imageURL,
        api_id: recipe.api_id || recipe.id,
      };
      try {
        await fetch(`/api/favourites`, {
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
      setIsHeartClicked(false);
    };

    const deleteFromFavourites = async () => {
      // if the heart is clicked to delete from favourites
      const deleteFavourite = {
        api_id: recipe.api_id || recipe.id,
      };
      try {
        await fetch(`/api/favourites`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deleteFavourite),
        });
      } catch (error) {
        console.error("Error deleting favourite:", error);
      }
      setIsHeartClicked(false);
    };

    if (isFav && isHeartClicked) {
      addToFavorites();
    } else if (!isFav && isHeartClicked) {
      deleteFromFavourites();
    }
  }, [isFav, recipe.id, name, imageURL, isHeartClicked]);

  return (
    <>
      <h2>Here Is Your {name} Recipe</h2>
      <div className="card" style={{ width: "35em", height: "auto" }}>
        <div style={{ textAlign: "center", marginTop: "3%" }}>
          <img
            className="card-img-top"
            src={imageURL}
            style={{ width: "30em", height: "auto" }}
            alt={`Image of ${name}`}
          />
        </div>
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
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
      <button onClick={handleButtonClick}>Back to results</button>
    </>
  );
}

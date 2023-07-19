import { React, useState, useEffect } from "react";

export default function RecipeCard({ recipe, setRecipe }) {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [cookingTime, setCookingTime] = useState(0);
  const [servingSize, setServingSize] = useState(0);
  const [imageURL, setImageURL] = useState("");

  const { title } = recipe;

  //fetching description and ingredients below
  useEffect(() => {
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

    getRecipeDescription();
  }, [recipe]);

  const handleButtonClick = () => {
    setRecipe({});
  };

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
        </div>
      </div>
      <button onClick={handleButtonClick}>Bring me back to my results</button>
    </>
  );
}

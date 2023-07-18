import { React, useState, useEffect } from "react";

export default function RecipeCard({ recipe, setRecipe }) {
  const [description, setDescription] = useState("");
  const title = recipe.title;
  const imageURL = recipe.image;

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
        setDescription(data.summary);
        console.log(data.summary);
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
      <div className="card" style={{ width: "20em", height: "auto" }}>
        <img
          className="card-img-top"
          src={imageURL}
          style={{ width: "15em", height: "auto" }}
          alt={`Image of ${title}`}
        />
        <div className="card-body">
          <h4 className="card-title">{recipe.title}</h4>
          <p className="card-text">{description}</p>
        </div>
      </div>
      <button onClick={handleButtonClick}>Back to results</button>
    </>
  );
}

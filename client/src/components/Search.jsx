import { React, useState, useEffect, useMemo } from "react";
import SearchBar from "./SearchBar";
import Results from "./Results";
import RecipeCard from "./RecipeCard";

export default function Search({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [fullRecipe, setFullRecipe] = useState({});
  const [showRecipe, setShowRecipe] = useState(false);

  const handleSearch = async (searchItem) => {
    const ingredients = searchItem;
    console.log(ingredients);

    // async function to fetch the search results
    try {
      const response = await fetch(
        `/api/recipe/findByIngredients?ingredients=${ingredients}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data) {
        setSearchResults(data);
      }
      if (data.length === 0) {
        setSearchResults([
          {
            id: "invalidInput",
            title:
              "Sorry, we were unable to fetch a recipe based on your input. Please check for typos or missing commas.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleRecipeClick = async (recipe) => {
    setFullRecipe(recipe);
    setShowRecipe(true);
  };

  return (
    <>
      {" "}
      {!showRecipe && <SearchBar onSearch={handleSearch} />}
      {!showRecipe && (
        <Results
          recipeClicked={handleRecipeClick}
          searchResults={searchResults}
        />
      )}
      {showRecipe && (
        <RecipeCard
          recipe={fullRecipe}
          setRecipe={setFullRecipe}
          setShowRecipe={setShowRecipe}
        />
      )}
    </>
  );
}

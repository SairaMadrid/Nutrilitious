import { React, useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Results from "./Results";
import RecipeCard from "./RecipeCard";

export default function Search({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [fullRecipe, setFullRecipe] = useState({});
  const [recipeFavourites, setRecipeFavourites] = useState([]);

  const handleSearch = async (searchItem) => {
    const ingredients = searchItem;

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

  const handleRecipeClick = async (index) => {
    setFullRecipe(searchResults[index]);
  };

  // need to access the favourites here so that the RecipeCard displays the correct heart status
  useEffect(() => {
    const getFavourites = async () => {
      try {
        const response = await fetch(`/api/favourites`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        const data = await response.json();

        setRecipeFavourites(data);
      } catch (error) {
        console.error("Error fetching recipe description:", error);
      }
    };

    getFavourites();
  }, []);

  return (
    <>
      {" "}
      {!fullRecipe.id && <SearchBar onSearch={handleSearch} />}
      {!fullRecipe.id && (
        <Results
          recipeClicked={handleRecipeClick}
          searchResults={searchResults}
        />
      )}
      {fullRecipe.id && (
        <RecipeCard
          recipeFavourites={recipeFavourites}
          recipe={fullRecipe}
          setRecipe={setFullRecipe}
        />
      )}
    </>
  );
}

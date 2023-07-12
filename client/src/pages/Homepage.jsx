import React, { useState, useEffect } from "react";
import SearchBar from "../components/Searchbar";

export default function Homepage() {
  const [searchResults, setSearchResults] = useState([]);

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
      console.log(response);
      const data = await response.json();
      setSearchResults(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <>
      <div>Homepage</div>
      <SearchBar onSearch={handleSearch} />
      {/* Rendering the recipe list below */}
      <ul>
        {searchResults.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </>
  );
}

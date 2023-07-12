import { React, useState } from "react";
import SearchBar from "./Searchbar";
import SearchContext from "../contexts/SearchContext";

export default function SearchProvider({ children }) {
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
      const data = await response.json();
      if (data) {
        setSearchResults(data);
      }
      if (data.length === 0) {
        // PLEASE choose one option to inform user regarding faulty input below
        /*    setSearchResults([
          {
            id: "invalidInput",
            title:
              "Sorry, we were unable to fetch a recipe based on your input. Please check for typos or missing commas.",
          },
        ]); */
        alert(
          "Sorry, we were unable to fetch a recipe based on your input. Please check for typos or missing commas."
        );
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <>
      {" "}
      <SearchBar onSearch={handleSearch} />
      <SearchContext.Provider value={searchResults}>
        {children}
      </SearchContext.Provider>
      <ul>
        {searchResults.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </>
  );
}

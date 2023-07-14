import { React, useState } from "react";
import SearchBar from "./Searchbar";
import Results from "./Results";

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

  return (
    <>
      {" "}
      <SearchBar onSearch={handleSearch} />
      <Results searchResults={searchResults} />
    </>
  );
}

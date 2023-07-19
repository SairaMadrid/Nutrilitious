import { React, useState, useEffect } from "react";

export default function Results({ searchResults, recipeClicked }) {
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    const getRecipeImages = async () => {
      try {
        const expectedImages = searchResults.map(async (result) => {
          const response = await fetch(`/api/recipe/images?id=${result.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          return data.imageURL;
        });

        const images = await Promise.all(expectedImages);
        setImageURLs(images);
      } catch (error) {
        console.error("Error fetching recipe image:", error);
      }
    };

    getRecipeImages();
  }, [searchResults]);

  const handleRecipeClick = (index) => {
    recipeClicked(index);
  };

  return (
    <>
      <ul>
        {searchResults.map((result, index) => (
          <li key={result.id}>
            {result.title}
            {imageURLs[index] && (
              <img
                onClick={() => handleRecipeClick(index)}
                style={{ width: "12em", height: "auto" }}
                src={imageURLs[index]}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

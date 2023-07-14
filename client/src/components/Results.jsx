import { React, useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../assets/secret";

export default function Results({ searchResults }) {
  const [imageURLs, setImageURLs] = useState([]);

  // not sure this is the most elegant way to access the images, but it works for now.. and it's just 9 results, so I hope it's not too much data waste to map twice through the same array
  useEffect(() => {
    const getRecipeImages = async () => {
      try {
        const expectedImages = searchResults.map(async (result) => {
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/${result.id}/information`,
            {
              params: {
                apiKey: API_KEY,
              },
            }
          );
          return response.data.image;
        });

        const images = await Promise.all(expectedImages);
        setImageURLs(images);
      } catch (error) {
        console.error("Error fetching recipe image:", error);
      }
    };

    getRecipeImages();
  }, [searchResults]);

  return (
    <>
      <ul>
        {searchResults.map((result, index) => (
          <li key={result.id}>
            {result.title}
            {imageURLs[index] && (
              <img
                style={{ width: "200px", height: "auto" }}
                src={imageURLs[index]}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

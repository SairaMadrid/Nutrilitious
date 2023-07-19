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
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {searchResults.map((result, index) => (
        <div key={result.id} className="col">
          <div className="card">
            {imageURLs[index] && (
              <img
                className="card-img-top"
                src={imageURLs[index]}
                alt={`Image of ${result.title}`}
                style={{
                  height: "200px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => handleRecipeClick(index)}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{result.title}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

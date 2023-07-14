import React from "react";

export default function Results({ searchResults }) {
  return (
    <>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </>
  );
}

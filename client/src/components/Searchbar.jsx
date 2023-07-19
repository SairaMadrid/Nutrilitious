import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchItems, setSearchItems] = useState("");

  const handleChange = (event) => {
    setSearchItems(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchItems);
  };

  return (
    <div>
      <input
        type="text"

        placeholder="Search by ingredients..."

        value={searchItems}
        onChange={handleChange}
      />{" "}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

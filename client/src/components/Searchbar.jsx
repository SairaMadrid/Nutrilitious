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
    <div className="container">
      <div className="row">
        <div className="col col-md-4 offset-sm-4 ">

      <input
      className="form-control my-2"
        type="text"
        placeholder="Search by ingredients..."
        value={searchItems}
        onChange={handleChange}
      />{" "}
          </div>
      </div>
      <button className="search-button btn btn-success my-2" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

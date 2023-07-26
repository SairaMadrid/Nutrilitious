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
    <>
      <h2 className="homepage-header py-4 fw-semibold">
        Explore Endless Culinary Possibilities
        <i className="fa-solid fa-utensils mx-2"></i>
      </h2>
      <p>
        Nutrilitious offers a wide array of recipes that cater to various
        tastes, dietary preferences, and cuisines.
      </p>
      <p>
        From savory to sweet, vegetarian to keto-friendly, we have something for
        everyone.
      </p>
      <div className="container">
        <div className="row">
          <div className="col col-md-4 offset-sm-4  ">
            <div className="form-floating">
              <input
                className="form-control my-2"
                type="text"
                placeholder="Search by ingredients..."
                value={searchItems}
                onChange={handleChange}
              />{" "}
              <label className="form-label text-sm">
                Search by ingredients
              </label>
            </div>
          </div>
        </div>
        <button
          className="search-button btn btn-success my-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </>
  );
}

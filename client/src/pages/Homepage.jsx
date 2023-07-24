import React from "react";
import Search from "../components/Search";

export default function Homepage() {
  return (
    <div className="container text-center py-2 my-2">
      <div>
        <h1
          className="homepage-header"
          style={{
            marginTop: "10%",
          }}
        >
          Get cooking!
        </h1>
        <div>
          <h5 className="homepage-blurb  py-2">
            Find a recipe to use up whatever you have in your fridge.
            <i className="fa-solid fa-seedling"></i>
          </h5>
        </div>
        <Search className="searchbar" />
      </div>
    </div>
  );
}

import React from "react";
import Search from "../components/Search";

export default function Homepage() {
  return (
    <div className="container text-center py-2 my-2">
      <div>
        <h2
          className="homepage-header py-4 fw-semibold"
        >
         Explore Endless Culinary Possibilities
         <i className="fa-solid fa-utensils mx-2"></i>
        </h2>
       <p>Nutrilitious offers a wide array of recipes that cater to various tastes, dietary preferences, and cuisines.</p>
       <p>From savory to sweet, vegetarian to keto-friendly, we have something for everyone.</p>
    
        <Search className="searchbar" />
       
      </div>
    </div>
  );
}

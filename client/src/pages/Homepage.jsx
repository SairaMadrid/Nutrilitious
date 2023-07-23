import React from "react";
import Search from "../components/Search";
import background from "../assets/background.jpg";

export default function Homepage() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="container-home">
      <div>
        <h1 className="homepage-header">Get cooking!</h1>
        <div>
          <h5 className="homepage-blurb">
            Find a recipe to use up whatever you have in your fridge.
            <i className="fa-solid fa-seedling"></i>
          </h5>
        </div>
        <Search className="searchbar" />
      </div>
      <div style={containerStyle}></div>

      <img className="background-home" src={background} alt="background" />
    </div>
  );
}

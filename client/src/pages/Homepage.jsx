import React from "react";
import Search from "../components/Search";

export default function Homepage() {
  return (
    <div className="container text-center py-2 my-2">
      <div>
        <Search className="searchbar" />
      </div>
    </div>
  );
}

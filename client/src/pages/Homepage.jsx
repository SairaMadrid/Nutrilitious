import React from "react";
import Search from "../components/Search";

export default function Homepage() {
  return (
    <>
      <div>Homepage</div>
      {/* the search bar coming from the search provider below*/}
      <div>
        <Search />
      </div>
    </>
  );
}

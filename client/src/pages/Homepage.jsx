import React from "react";
import SearchProvider from "../components/SearchProvider";

export default function Homepage() {
  return (
    <>
      <div>Homepage</div>
      {/* the search bar coming from the search provider below*/}
      <div>
        <SearchProvider />
      </div>
    </>
  );
}

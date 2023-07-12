import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const auth = useAuth();

  const logout = () => {
    auth.logout();
  };

  return (
    <>
      <div>
        <div>
          <Link to="/">Homepage</Link>
        </div>
        <div>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div>
          <Link to="/favourites">Favourites</Link>
        </div>
        <div>
          <Link to="/results">Search results</Link>
        </div>
        <div>
          <Link to="/profile">Profile</Link>
        </div>
        <button className="btn" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
}

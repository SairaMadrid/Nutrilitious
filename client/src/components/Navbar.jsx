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
      {/* links to show when user is NOT logged in */}
      <div>
        <div>
          <Link to="/">Homepage</Link>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/profile">Profile</Link>{" "}
          {/* this could route back to the login page if not logged in and register page if not a member */}
        </div>
      </div>

      {/* links to show when logged in */}
      <div>
        <div>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div>
          <Link to="/favourites">Favourites</Link>
        </div>
        <div>
          <Link to="/results">Search results</Link>
        </div>
        <button className="btn" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
}

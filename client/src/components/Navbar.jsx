import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
​
export default function Navbar() {
  const auth = useAuth();
​
  const logout = () => {
    auth.logout();
  };
​
  return (
    <>
      {!auth.isLoggedIn && (
        <div>
          <div>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/register">Register</Link>
          </div>
          {/* do we want the searchbar to be seen here? */}
          <div>
            <Link to="/searchbar">Search</Link>
          </div>
          
        </div>
      )}
​
      {auth.isLoggedIn && (
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
          <div>
            <Link to="/profile">Profile</Link>
          </div>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
}
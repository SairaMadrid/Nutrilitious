import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const auth = useAuth();
  console.log(auth);

  const logout = () => {
    auth.logout();
  };

  return (
    <>
      {!auth.isLoggedIn && (
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
        </div>
      )}

      {auth.isLoggedIn && (
        <div>
          <div>
            <Link to="/profile">Profile</Link>{" "}
            {/* this could route back to the login page if not logged in and register page if not a member */}
          </div>
          <div>
            <Link to="/">Homepage</Link>
          </div>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
}

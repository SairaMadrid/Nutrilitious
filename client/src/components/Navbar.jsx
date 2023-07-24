import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import nutri from "../assets/nutri.jpg";

export default function Navbar() {
  const auth = useAuth();

  const logout = () => {
    auth.logout();
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          {" "}
          <img className="logo" src={nutri} alt="nutri" />
        </Link>
        <div className="navbar-nav ml-auto">
          {" "}
          {/* Right-aligned Links */}
          {!auth.isLoggedIn && (
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/">
                <i className="fas fa-home"></i> Homepage
              </Link>
              <Link className="nav-item nav-link" to="/register">
                <i className="fas fa-user-plus"></i> Register
              </Link>
              <Link className="nav-item nav-link" to="/login">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
            </div>
          )}
          {auth.isLoggedIn && (
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/profile">
                <i className="fas fa-user"></i> Profile
              </Link>
              <Link className="nav-item nav-link" to="/">
                <i className="fas fa-home"></i> Homepage
              </Link>
              <button className="btn btn-outline-danger" onClick={logout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

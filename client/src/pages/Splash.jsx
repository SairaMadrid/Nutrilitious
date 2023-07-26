import React from 'react';
import { useNavigate } from "react-router-dom";
import "./splash.css";
import logo from "../assets/logo.png";


export default function Splash() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/homepage");
    }
  return (
    <div className='container text-center py-2'>
    <img className='logo2' src={logo} alt="logo" />
    <h1
          className="homepage-header"
        >
          Get cooking!
        </h1>
        <div>
          <h5 className="homepage-blurb  py-2">
            Find a recipe to use up whatever you have in your fridge
            <i className="fa-solid fa-seedling mx-1"></i>
          </h5>
        </div>
        <button
        onClick={handleClick}
            className="btn btn-success my-2 py-2 px-3"
          >
            Start Cooking<i className="fa-solid fa-arrow-right ms-3"></i>
          </button>
    </div>
  )
}

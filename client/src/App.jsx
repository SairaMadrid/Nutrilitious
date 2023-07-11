import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Results from "./components/Results";
import RecipeCard from "./components/RecipeCard";
import Favourites from "./components/Favourites";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="wrapper">
      <h1>NutriApp</h1>

      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/results" element={<Results />}></Route>
        <Route path="/recipes/:id" element={<RecipeCard />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
      </Routes>
    </div>
  );
}

export default App;

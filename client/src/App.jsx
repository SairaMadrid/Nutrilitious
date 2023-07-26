import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Results from "./components/Results.jsx";
import RecipeCard from "./components/RecipeCard.jsx";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import AuthProvider from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import Splash from "./pages/Splash";

function App() {
  return (
    <AuthProvider>
      <div className="wrapper">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Splash />}></Route>
          <Route exact path="/homepage" element={<Homepage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/results" element={<Results />}></Route>
          <Route path="/recipes/:id" element={<RecipeCard />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;

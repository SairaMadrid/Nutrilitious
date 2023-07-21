import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useProvideAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    preference: "",
    cooking_skills: "",
    description: "",
  });

  const navigate = useNavigate();

  const login = async (user) => {
    try {
      const { data } = await axios("api/auth/login", {
        method: "POST",
        data: user,
      });
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

    const register = async () => {
      try {
        await axios.post("/api/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error.message);
      }
    };

  return {
    isLoggedIn,
    login,
    logout,
    user,
    setUser,
    register
  };
}

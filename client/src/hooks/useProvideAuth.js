import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useProvideAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const login = async (user) => {
    try {
      const { data } = await axios("api/auth/login", {
        method: "POST",
        data: user,
      });
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      //console.log(data.token);
    } catch (error) {
      throw new Error(error);
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };



  return {
    isLoggedIn,
    login,
    logout,
  };
}

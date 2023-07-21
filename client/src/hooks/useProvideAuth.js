import { useState } from "react";
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
    } catch (error) {
      console.log(error);
    }
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };


  return {
    isLoggedIn,
    login,
    logout
  };
}

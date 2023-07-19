import { useState } from "react";
import axios from "axios";

export default function useProvideAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  // localStorage.getItem("token") ? true: false;

  const login = async (user) => {
    try {
      const { data } = await axios("/api/auth/login", {
        method: "POST",
        data: user,
      });

      //store the token in localStorage
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
    } catch (error) {
      // console.log(error);
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

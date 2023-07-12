import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  //const [data, setData] = useState([]);

const { email, password } = user;

const handleEmailChange = (e) => {
  setUser({ ...user, email: e.target.value})
};

const handlePasswordChange = (e) => {
  setUser({ ...user, password: e.target.value})
};

  const login = async () => {
    try {
      const {data} = await axios('api/auth/login', {
        method: "POST",
        data: user,
      });
      localStorage.setItem('token', data.token);
      console.log(data.token);
    } catch (error) {
      throw error
    }
  };


  return(
  <div>
  <h1>Login</h1>
  <label className="">Username</label>
      <input 
      className=''
      value={email} 
      onChange={handleEmailChange}
      name="username"
      type="text"
            />
            
    <label className="">Password</label>
       <input 
        className=''
        value={password} 
        onChange={handlePasswordChange}
        name="password"
        type="password"
            />
       <button 
       className=''
       onClick={login}>
           Sign in
       </button>
       </div>
)}
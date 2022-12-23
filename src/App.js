import './App.css';
import React, {useEffect, useState} from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import Home from "./components/Home.js"
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import jwtDecode from 'jwt-decode';


function App() {
  

  const [isLoggedIn, setLoggedIn] = useState(false);
  const[user, setUser] = useState()
  const navigate=  useNavigate;
  useEffect(() =>{
    const token = JSON.parse(localStorage.getItem("TOKEN"));
    
    if(token){
      const decodedToken = jwtDecode(token);  
      if(decodedToken.exp*1000 < Date.now()){
        setUser(null);
        setLoggedIn(false);
        navigate("/login");
      }
      else{
        setUser(decodedToken);
        setLoggedIn(true);
      }
    }

  },[])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home isLoggedIn = {isLoggedIn} user={user} setUser={setUser} setLoggedIn={setLoggedIn} />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;

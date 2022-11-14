import React from "react";
import {Routes, Route } from "react-router-dom";
import { Home } from "../home";
import { Login } from "./login";
import { Register } from "./register";
import './assets/style.css';

export const Rotas = (AuthApi) => {
    const Auth = React.useContext(AuthApi);
    return (
      <Routes>
        <Route path="/" element={() => (!Auth.auth ? <Home /> : <Login />)} />
        <Route path="/register"  element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  };
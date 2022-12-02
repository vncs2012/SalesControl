import React from "react";
import {Routes, Route } from "react-router-dom";
import { Home } from "../home";
import { Login } from "./login";
import { Register } from "./register";
import { AuthApi } from "../../App";

export const Rotas = () => {
    const Auth = React.useContext(AuthApi);
    return (
      <Routes>
        <Route path="/" element={Auth.auth ? <Home /> : <Login />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/login" element={!Auth.auth ? <Login /> :  window.location.href = "/"} />
      </Routes>
    );
  };
import React from "react";
import {Routes, Route } from "react-router-dom";
import { Login } from "../login/login";
import { Register } from "./../login/register";

export const Rotas = () => {
    return (
      <Routes>
        <Route path="/register"  element={<Register />} />
        <Route path="/login"  element={<Login />} />
      </Routes>
    );
  };
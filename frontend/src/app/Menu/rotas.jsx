import React from "react";
import {Routes, Route } from "react-router-dom";
import { Orders } from "./Orders";

export const Rotas = () => {
    return (
      <Routes>
        <Route path="/orders"  element={<Orders />} /> 
      </Routes>
    );
  };
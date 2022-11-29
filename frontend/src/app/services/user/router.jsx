import React from "react";
import { Routes, Route } from "react-router-dom";
import { List } from "./list";
import { Insert } from "./insert";

export const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<List />} />
      <Route path="add" element={<Insert />} />
    </Routes>
  );
};
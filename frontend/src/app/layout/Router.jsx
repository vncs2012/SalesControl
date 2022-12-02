import React from "react";
import { Routes, Route } from "react-router-dom";
import { Sales } from "../services/Sale";
import { User } from "../services/user";
import { Insert } from "../services/user/insert";
import { List } from "../services/user/list";
import { Update } from "../services/user/update";

export const Routers = () => {
  return (
    <Routes>
      <Route path="user/" element={<User />}>
        <Route index element={<List />} />
        <Route path="add" element={<Insert />} />
        <Route path=":id/" element={<Update />} />
      </Route>
      <Route path="orders/" element={<Sales />} />
    </Routes>
  );
};
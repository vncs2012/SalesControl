import React from "react";
import { Routes, Route } from "react-router-dom";
import { Sales } from "../services/sale";
import { User } from "../services/user";
import { Insert as InsertUser } from "../services/user/insert";
import { List as ListUser} from "../services/user/list";
import { Update as UpdateUser } from "../services/user/update";

import { Insert as InsertSale } from "../services/sale/insert";
import { List as ListSale} from "../services/sale/list";
import { Update as UpdateSale } from "../services/sale/update";

export const Routers = () => {
  return (
    <Routes>
      <Route path="user/" element={<User />}>
        <Route index element={<ListUser />} />
        <Route path="add" element={<InsertUser />} />
        <Route path=":id/" element={<UpdateUser />} />
      </Route>
      <Route path="orders/" element={<Sales />} >
        <Route index element={<ListSale />} />
        <Route path="add" element={<InsertSale />} />
        <Route path=":id/" element={<UpdateSale />} />
      </Route>
    </Routes>
  );
};
import React from "react";
import { Routes, Route } from "react-router-dom";

import { Dashboard } from "./Dashboard";

import { User } from "../services/user";
import { Insert as InsertUser } from "../services/user/insert";
import { List as ListUser} from "../services/user/list";
import { Update as UpdateUser } from "../services/user/update";

import { Orders } from "../services/orders";
import { Insert as InsertOrders } from "../services/orders/insert";
import { List as ListOrders} from "../services/orders/list";
import { Update as UpdateOrders } from "../services/orders/update";


import { Client } from "../services/client";
import { Insert as InsertClient } from "../services/client/insert";
import { List as ListClient} from "../services/client/list";
import { Update as UpdateClient } from "../services/client/update";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}/>
      <Route path="user/" element={<User />}>
        <Route index element={<ListUser />} />
        <Route path="add" element={<InsertUser />} />
        <Route path=":id/" element={<UpdateUser />} />
      </Route>
      <Route path="orders/" element={<Orders />} >
        <Route index element={<ListOrders />} />
        <Route path="add" element={<InsertOrders />} />
        <Route path=":id/" element={<UpdateOrders />} />
      </Route>
        <Route path="client/" element={<Client />} >
        <Route index element={<ListClient />} />
        <Route path="add" element={<InsertClient />} />
        <Route path=":id/" element={<UpdateClient />} />
      </Route>
    </Routes>
  );
};
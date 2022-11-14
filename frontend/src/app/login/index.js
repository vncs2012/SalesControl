import React, { useState } from "react";
import { Rotas } from "./login.router"
const AuthApi = React.createContext();


export const Index = () => {
    const [auth, setAuth] = useState(false);
    return  (
        <>
            <AuthApi.Provider value={{ auth, setAuth }}>
                <div>
                    <Rotas />
                </div>
            </AuthApi.Provider>
        </>
    );
}
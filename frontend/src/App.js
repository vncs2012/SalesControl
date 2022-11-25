import React, { useState } from "react";
import './App.css';
import { Index as Login } from "./app/login/index"
import Cookies from "js-cookie";
import { Home } from "./app/home";

export const AuthApi = React.createContext();
export const TokenApi = React.createContext();

function App() {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  const readCookie = () => {
    let token = Cookies.get("token");
    if (token) {
      setAuth(true);
      setToken(token);
    }
  };
  React.useEffect(() => {
    readCookie();
  }, [token,auth]);
  console.log(auth)
  return (
    <>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <TokenApi.Provider value={{ token, setToken }}>
          {(!auth ? <Login /> : <Home />)}
          </TokenApi.Provider>
      </AuthApi.Provider>
    </>
  );
}
export default App;

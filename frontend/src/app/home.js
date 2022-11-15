import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AuthApi, TokenApi } from "../App";
import { getdata } from "./homeApi";

export const Home = () => {
    const Token = React.useContext(TokenApi);
    const Auth = React.useContext(AuthApi);
    const [data, setData] = useState("");
    const handleonclick = () => {
        Auth.setAuth(false);
        Cookies.remove("token");
    };

    useEffect(() => {
        async function fetchData() {
            let x = await getdata(Token);
            setData(x);
        }
        fetchData()
    }, []);
    return (
        <>
            <h2>Home</h2>
            <button onClick={handleonclick}>Logout</button>
            <h1 id="1">{data.data}</h1>
        </>
    );
};
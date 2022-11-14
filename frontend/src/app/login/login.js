import React, { useState } from "react";
import { onThemeChange } from './assets/script';
import axios from 'axios';
import Cookies from 'js-cookie';

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (evt) => {
        console.log('entrou')
        if (evt) {
            evt.preventDefault();
        }
        const data = {
            username: username,
            password: password,
        };
        console.log(data)
        const news = async () => {
            let res = await axios
                .post("http://127.0.0.1:8000/login/", data)
                .then((response) => {
                    console.log(response);
                    Cookies.set("token", response.data.access_token);
                    return response;
                })
                .catch((error) => {
                     console.log(error.message);
                });
            return res;
        };
        let x = await news();
        if (x) {
            window.location.reload();
        }
    };
    return (
        <>
            <div className="themed">
                <div className="main">
                    <div id="illustration"></div>
                    <div className="form-container">
                        <div className="theme-selector">
                            <input
                                type="checkbox"
                                id="switch"
                                onChange={onThemeChange}
                                value="dark"
                            />
                            <label htmlFor="switch">Toggle</label>
                        </div>
                        <div className="form-header">
                            <h3>Entre nessa viagem</h3>
                            <p>Não tem uma conta? <strong>Cadastre-se</strong></p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                            <input placeholder="Senha" type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input className="buttonLogin" type="submit" value="Continuar" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
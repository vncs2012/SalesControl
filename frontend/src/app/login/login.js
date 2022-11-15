import React, { useEffect, useState } from "react";
import { changeTheme, onThemeChange } from './assets/script';
import { logar } from "./loginApi";
import './assets/style.css';

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [theme, setTheme] = useState("");
    const handleSubmit = async (evt) => {
        if (evt) {
            evt.preventDefault();
        }
        const data = { username: username, password: password, };
        let x = await logar(data);
        if (x) {
            window.location.href = '/';
        }
    };
    useEffect(() => {
        let tm = window.localStorage.getItem("theme") ?? "dark";
        setTheme(tm)
        changeTheme(tm);
    }, [])
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
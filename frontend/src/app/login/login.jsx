import React, { useEffect, useState } from "react";
import { logar } from "./loginApi";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 lg:min-h-screen lg:flex lg:items-center p-8 sm:p-12">
                    <div className="flex-grow">
                        <h1 className="text-white text-center text-2xl sm:text-5xl mb-2 ">
                            Seja bem vindo(a)
                        </h1>
                        <p className="text-center text-blue-200 sm:text-lg">Controle de vendas.</p>
                    </div>
                </div>
                <div className="lg:min-h-screen lg:flex lg:items-center p-12 lg:p-24 xl:p-48" >
                    <div className="flex-grow bg-white border shadow-xl rounded-md border-gray-300 p-8">
                        <div className="sm:flex sm:items-center">
                            <img className="sm:flex-shrink-0 mx-auto sm:mx-0 h-24 w-24 rounded-full" src="https://images.unsplash.com/photo-1520792499289-48163a0ecb84" />
                            <div className="sm:ml-6 sm:text-left text-center">
                                <input type="text" placeholder="Usuário" className="flex-1 w-full text-gray-700 bg-gray-200 rounded-md hover:bg-white border border-gray-200 outline-none 
                  focus:bg-white py-2 px-4 mb-2" value={username}
                                    onChange={(e) => setUsername(e.target.value)} />
                                <input type="password" placeholder="Senha" className="flex-1 w-full text-gray-700 bg-gray-200 rounded-md hover:bg-white border border-gray-200 outline-none 
                  focus:bg-white py-2 px-4" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid w-full mt-8 justify-items-end" action="">
                            <div>
                                <button  onClick={handleSubmit} type="button" className="flex-shrink-0 outline-none w-36 bg-green-500 hover:bg-green-500 py-2 px-4 ml-4 text-white font-semibold rounded-full ">
                                    Entrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
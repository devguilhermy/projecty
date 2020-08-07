import React, {useState} from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/api"

import Header from "../../components/Header";

import "./styles.css"

function LoginUser() {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleUserLogin(event){
        event.preventDefault();

        if (email === "" || password === "") {
            return alert("Preencha todos os campos!");
        }

        
        const response = await api.post("/auth/login", {
            email,
            password
        });

        if (response.data) {
            alert(response.data.message)
            history.push("/");
        }
    }

    return (
        <div className="user-login">
            <Header
                title="Login de usuário"
            />
            <main>
               <form onSubmit={handleUserLogin}>
               <fieldset>
                    <legend>Insira seus dados</legend>


                    <div className="input-block">
                        <label htmlFor="email">Seu email</label>
                        <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={event=>{
                            setEmail(event.target.value)
                        }}
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="password">Sua senha</label>
                        <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={event=>{
                            setPassword(event.target.value)
                        }}
                        />
                    </div>

                    <button type="submit">
                        Fazer login
                    </button>
                </fieldset>
               </form>
            </main>
        </div>
    )
}

export default LoginUser;
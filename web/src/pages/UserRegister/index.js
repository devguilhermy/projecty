import React, {useState} from "react";
import { useHistory } from "react-router-dom";

import api from "../../services/api"

import Header from "../../components/Header";

import "./styles.css"

function RegisterUser() {
    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");

    async function handleUserRegister(event){
        event.preventDefault();

        if (name === "" || email === "" || password === "" || password_confirmation === "") {
            return alert("Preencha todos os campos!");
        }

        if (password !== password_confirmation) {
            return alert("Senhas não conferem")
        }
        
        const response = await api.post("/auth/register", {
            name,
            email,
            password
        });

        if (response.data) {
            alert(response.data.message)
            history.push("/");
        }
    }

    return (
        <div className="user-register">
            <Header
                title="Cadastro de usuário"
            />
            <main>
               <form onSubmit={handleUserRegister}>
               <fieldset>
                    <legend>Preencha seus dados</legend>

                    <div className="input-block">
                        <label htmlFor="name">Seu nome</label>
                        <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={event=>{
                            setName(event.target.value)
                        }}
                        />
                    </div>

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

                    <div className="input-block">
                        <label htmlFor="password_confirmation">Confirme a senha</label>
                        <input
                        type="password"
                        id="password_confirmation"
                        value={password_confirmation}
                        onChange={event=>{
                            setPasswordConfirmation(event.target.value)
                        }}
                        />
                    </div>

                    <button type="submit">
                        Cadastrar
                    </button>
                </fieldset>
               </form>
            </main>
        </div>
    )
}

export default RegisterUser;
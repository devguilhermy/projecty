import React from "react";
import {Link} from "react-router-dom";

import logoImg from "../../assets/icons/logo.svg"

import "./styles.css";

function LandingPage(){
    return (
        <div id="landing-page" className="container">
            <header>
                <img src={logoImg} alt="Logo"/>
                <strong>Welcome to ProjectE</strong>
            </header>
            <main>
                <Link to="/register" className="cta-link">
                    Fazer cadastro
                </Link>
                <Link to="/login" className="cta-link">
                    Fazer login
                </Link>
            </main>
        </div>
    );
}

export default LandingPage;
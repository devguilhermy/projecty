import React from "react";

import {Link} from "react-router-dom";

import logoImg from "../../assets/icons/logo.svg"
import backImg from "../../assets/icons/back.svg"

import "./styles.css";


function Header(props){
    return(
        <header className="page-header">
            <div className="header-top">
                <Link to="/" className="button-back">
                    <img src={backImg} alt=""/>
                </Link>
                <img src={logoImg} alt="" />
            </div>
            <div className="header-content">
                <strong>{props.title}</strong>
                {props.subtitle && <p>{props.subtitle}</p>}
                
                {props.children}
            </div>
        </header>
    )
}

export default Header;
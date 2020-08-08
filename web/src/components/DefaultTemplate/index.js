import React from "react";
import { Link } from 'react-router-dom'

import logoImg from '../../assets/icons/logo.svg'
import backImg from '../../assets/icons/back.svg'

import "./styles.css"

function DefaultTemplate(props) {
	return (
		<div className="page-container">
			<header className='page-header'>
				<div className='header-top'>
					<Link to='/' className='button-back'>
						<img src={backImg} alt='' />
					</Link>
					<img src={logoImg} alt='' />
				</div>
				<div className='header-content'>
					<strong>{props.title}</strong>
					{props.subtitle && <p>{props.subtitle}</p>}
				</div>
			</header>
			<div className="page-content">
				<main>
					{props.children}
				</main>
			</div>
			<footer>
				<img src={logoImg} alt="Logo" />
				<p>Projecty 2020 Copyright</p>
			</footer>
		</div>
	);
}

export default DefaultTemplate;
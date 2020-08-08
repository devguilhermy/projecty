import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import DefaultTemplate from '../../components/DefaultTemplate'

import { FaUser, FaTasks, FaPlus, FaProjectDiagram, FaSignOutAlt } from 'react-icons/fa'

import './styles.css'

function Menu() {
	return (
		<DefaultTemplate title="Menu">
			<section>
				<div className='section-title'>Projetos</div>
				<Link to='/projects' className='cta-link'>
					<FaProjectDiagram />
                        Meus projetos
                    </Link>
				<Link to='/projects/new' className='cta-link'>
					<FaPlus />
                        Cadastrar novo
                    </Link>
			</section>
			<section>
				<div className='section-title'>Tarefas</div>
				<Link to='/tasks' className='cta-link'>
					<FaTasks />
                        Minhas tarefas
                    </Link>
				<Link to='/tasks/new' className='cta-link'>
					<FaPlus />
                        Cadastrar nova
                    </Link>

			</section>
			<section>
				<div className='section-title'>Opções</div>
				<Link to='/account' className='cta-link'>
					<FaUser />
                        Conta
                    </Link>
				<Link to='/logout' className='cta-link'>
					<FaSignOutAlt />
                        Deslogar
                    </Link>
			</section>
		</DefaultTemplate>
	)
}

export default Menu;

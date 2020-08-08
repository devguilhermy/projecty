import React, { useState } from "react"

import api from "../../services/api.js";

import DefaultTemplate from "../../components/DefaultTemplate"
import ProjectItem from "../../components/ProjectItem"

import { FaUser, FaTasks, FaPlus, FaProjectDiagram, FaSignOutAlt } from "react-icons/fa"
import "./styles.css"

function Menu() {
	const [projects, setProjects] = useState([]);

	function loadProjects() {
		api.get("/projects", {
			headers: {
				"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmRiMDY3YWU4ZTNhNDRhMDNhZTQwOCIsImlhdCI6MTU5Njg1MTc4OCwiZXhwIjoxNTk2ODU1Mzg4fQ.QNDshL-pg0J3-QT8-aV_tcoLgkLC6He0nYHsx49ys3k"
			}
		}).then(response => {
			setProjects(response.data.projects);
		}).catch(error => {
			alert(error.response.data.message)
		});
	}

	window.addEventListener("load", loadProjects)

	return (
		<DefaultTemplate title="Meus projetos" subtitle="Sua lista de projetos">
			{projects.map(project => {
				return (
					<ProjectItem
						key={project._id}
						id={project._id}
						title={project.title}
						description={project.description}
						createdAt={project.createdAt}
					/>
				)
			})}
		</DefaultTemplate>
	)
}

export default Menu

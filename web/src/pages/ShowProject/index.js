import React, { useState } from "react";
import queryString from "query-string";

import api from "../../services/api.js";

import DefaultTemplate from "../../components/DefaultTemplate"
import ProjectItem from "../../components/ProjectItem"

import { FaUser, FaTasks, FaPlus, FaProjectDiagram, FaSignOutAlt } from "react-icons/fa"
import "./styles.css"
import { useLocation, useParams } from "react-router-dom";

function Menu(props) {
	const params = useParams();

	const [projectInfo, setProjectInfo] = useState({});

	api.get(`/projects/${params.id}`, {
		headers: {
			"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmRiMDY3YWU4ZTNhNDRhMDNhZTQwOCIsImlhdCI6MTU5Njg1MTc4OCwiZXhwIjoxNTk2ODU1Mzg4fQ.QNDshL-pg0J3-QT8-aV_tcoLgkLC6He0nYHsx49ys3k"
		}
	}).then(response => {
		setProjectInfo(response.data.project);
	}).catch(error => {
		console.log(error.response);
	})


	console.log(params)

	return (
		<DefaultTemplate title="Meus projetos" subtitle="Sua lista de projetos">
			<ProjectItem title={projectInfo.title}></ProjectItem>
		</DefaultTemplate>
	)
}

export default Menu

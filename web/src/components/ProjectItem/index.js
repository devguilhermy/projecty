import React from "react";

import { Link } from "react-router-dom";

import "./styles.css";
import { FaTrash, FaEye } from "react-icons/fa";

function ProjectItem(props) {
	return (
		<article className="project-item">
			<div className="project-info">
				<div className="project-title">
					{props.title}
				</div>
				<div className="project-description">
					{props.description}
				</div>
				<div className="project-creation-date">
					{props.createdAt}
				</div>
			</div>
			<div className="project-actions">

				<Link to={`/projects/${props.id}`}>
					<FaEye></FaEye>
					Ver
				</Link>
				<Link to={`/projects/delete/${props.id}`}>
					<FaTrash></FaTrash>
					Excluir
				</Link>
			</div>
		</article >
	)
}

export default ProjectItem;
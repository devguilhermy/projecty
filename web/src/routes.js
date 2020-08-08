import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import LandingPage from "./pages/LandingPage"
import UserRegister from "./pages/UserRegister"
import UserLogin from "./pages/UserLogin"

import MyProjects from "./pages/MyProjects"
import ShowProject from "./pages/ShowProject"
import ProjectRegister from "./pages/ProjectRegister"

import Menu from "./pages/Menu"
import Error404 from "./pages/Error404"

import "./assets/styles/global.css"

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/menu" component={Menu} exact />
				<Route path="/" component={LandingPage} exact />

				<Route path="/register" component={UserRegister} exact />
				<Route path="/login" component={UserLogin} exact />

				<Route path="/projects" component={MyProjects} exact>
				</Route>

				<Route path="/projects/:id" component={ShowProject} exact />

				<Route path="/projects/new" component={ProjectRegister} exact />
				{/* <Route path="/projects/delete/:id" component={DeleteProject} exact /> */}
				{/* 
        <Route path="/tasks" component={MyTasks} exact />
        <Route path="/tasks/new" component={TaskRegister} exact />


        <Route path="/account" component={Account} exact />
        <Route path="/logout" component={Logout} exact /> */}

				<Route path="/404" component={Error404} />
				<Redirect to="/404" />
			</Switch>
		</BrowserRouter>
	)
}

export default Routes

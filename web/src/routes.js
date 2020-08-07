import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import LandingPage from "./pages/LandingPage"
import UserRegister from "./pages/UserRegister"
import UserLogin from "./pages/UserLogin"
import Error404 from "./pages/Error404"

import "./assets/styles/global.css";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/register" component={UserRegister} exact />
                <Route path="/login" component={UserLogin} exact />

                <Route path="/" component={LandingPage} exact />

                <Route path="/404" component={Error404} />
                <Redirect to="/404" />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
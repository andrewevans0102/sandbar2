import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Detail from "./containers/Detail";
import Profile from "./containers/Profile";
import Login from "./containers/Login";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/details/:id?" component={Detail} />
        </Switch>
    );
};

export default Routes;

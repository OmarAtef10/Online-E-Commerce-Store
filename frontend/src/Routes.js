import React from "react";
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import Home from "./core/home";
import privateRoutes from "./auth/helper/privateRoutes";
import signup from "../src/user/signup";
import dashboard from "./user/dashboard";
import Signup from "../src/user/signup";
import Signin from "./user/signin";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/signin" component={Signin}/>

                <privateRoutes exact path="/user/dashboard" component={dashboard}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;

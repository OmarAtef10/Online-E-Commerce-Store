import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./core/home";
import PrivateRoutes from "./auth/helper/privateRoutes";
import dashboard from "./user/dashboard";
import Signup from "../src/user/signup";
import Signin from "./user/signin";
import Cart from "./core/cart";
import Dashboard from "./user/dashboard";


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/signin" component={Signin}/>
                <PrivateRoutes path="/user/dashboard" exact  component={Dashboard}/>
                <PrivateRoutes path="/cart" exact component={Cart}/>

            </Switch>
        </BrowserRouter>
    );
};

export default Routes;

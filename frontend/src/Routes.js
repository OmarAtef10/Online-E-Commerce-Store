import React from "react";
import {BrowserRouter , Switch, Link,Route } from 'react-router-dom';
import Home from "./core/home";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;

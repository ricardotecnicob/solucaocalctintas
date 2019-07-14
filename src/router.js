import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Calculo from './pages/Calculo';

class Routers extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/calculo" component={Calculo} />
            </Switch>
        );
    }
}

export default Routers;
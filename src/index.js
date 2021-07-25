import React from 'react'
import ReactDom from 'react-dom'
import {HashRouter,Switch,Route} from "react-router-dom";
import {Provider} from "react-redux";

import store from "./redux/store";
import Register from "./containers/register/Register";
import Login from "./containers/login/Login";
import Main from "./containers/main/Main";

import './assets/css/index.less'


ReactDom.render(
    (<Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path = '/login' component = {Login}/>
                <Route path = '/register' component = {Register}/>
                {/*default component*/}
                <Route  component = {Main}/>
            </Switch>
        </HashRouter>
    </Provider>),
    document.getElementById('root')
)

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import {Provider} from "react-redux";
import {setupStore} from "./store";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";

const reduxStore = setupStore();
ReactDOM.render(
    <div>
        <Provider store={reduxStore}>
        <BrowserRouter>
            <Switch>
                <Route exact path={["/", "/login"]} component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
                <Route exact path="/main" component={MainPage}/>
            </Switch>
        </BrowserRouter>
        </Provider>
    </div>,
  document.getElementById('root')
);


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import store from './store';
import { Provider } from 'react-redux'
import { Auth0Provider } from "@auth0/auth0-react";

// domain -> dev-qokrrfi27ece4viv.us.auth0.com 
// client-id -> pfK6SLo3Q9t2FmIzlBmn6ENGqXSFU2x4


// axios.defaults.baseURL='https://difficult-lamb-flannel-shirt.cyclic.app'
axios.defaults.baseURL = 'http://localhost:5000'

ReactDOM.render(
    <Auth0Provider
        domain="dev-qokrrfi27ece4viv.us.auth0.com"
        clientId="pfK6SLo3Q9t2FmIzlBmn6ENGqXSFU2x4"
        redirectUri={window.location.origin}
    >
        <Provider store={store}>
            <App />
        </Provider>
    </Auth0Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

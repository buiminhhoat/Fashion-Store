import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import RouterCustom from "./router";
import {BrowserRouter} from "react-router-dom";
import './style/style.scss'
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <GoogleOAuthProvider clientId="40127943387-r9he5m6jp6kcl8rhhhdhqms9oj5qci7v.apps.googleusercontent.com">
        <BrowserRouter>
            <RouterCustom />
        </BrowserRouter>
    // </GoogleOAuthProvider>
);
reportWebVitals();

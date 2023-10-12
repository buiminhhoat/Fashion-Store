import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import RouterCustom from "./router";
import {BrowserRouter} from "react-router-dom";
import './style/style.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <BrowserRouter>
        <RouterCustom />
      </BrowserRouter>
    </React.StrictMode>
);
reportWebVitals();

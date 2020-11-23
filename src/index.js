import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { CounterProvider } from './store/CounterProvider'
import { LoginProvider } from './store/LoginProvider'
import { UrlProvider } from './store/UrlProvider'
import { UserProvider } from './store/UserProvider'
import { CartProvider } from './store/CartProvider'
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <UserProvider>
          <UrlProvider>
            <LoginProvider>
              <App />
            </LoginProvider>
          </UrlProvider>
        </UserProvider>
      </CartProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

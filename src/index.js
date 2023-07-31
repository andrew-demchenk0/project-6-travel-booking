import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { store } from "./App/store";
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import './css/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>
);

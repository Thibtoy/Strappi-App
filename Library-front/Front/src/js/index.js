import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/store.js';
import App from './App';


const mountNode = document.getElementById('app');
const store = configureStore();

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>
    , mountNode);
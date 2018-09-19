import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import AppRouter from './routers';
import configureStore from './store/configureStore';
import connectWebsocket from './websocket';
import theme from './themes';
import 'normalize.css/normalize.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ladda/dist/ladda.min.css';

//pega o store do redux
const store = configureStore();

//cria os providers
const jsx = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <AppRouter />
        </ThemeProvider> 
    </Provider>
);

//renderiza o jsx no html
ReactDOM.render(jsx, document.getElementById('app'));

//inicializa o websocket
connectWebsocket(store);
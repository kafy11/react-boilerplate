import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { ThemeProvider } from 'styled-components';
import theme from './themes';
import 'normalize.css/normalize.css';
//import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

//pega o store do redux
const store = configureStore();

//cria os providers
const jsx = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <AppRouter/>
        </ThemeProvider> 
    </Provider>
);

//renderiza o jsx no html
ReactDOM.render(jsx, document.getElementById('app'));
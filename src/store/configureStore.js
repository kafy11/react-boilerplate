import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

//inclui o compose necessário para a extensão do redux para o chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//função que cria e retorna o store do redux, combinando todos os reducers
export default () => {
    const store = createStore(
        combineReducers({
            data: reducer,
        }),
        composeEnhancers(applyMiddleware(thunk)) //adiciona o plugin redux-thunk que permite eventos assíncronos
    );

    return store;
}
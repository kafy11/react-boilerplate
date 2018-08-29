import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { queryReducer, websocketReducer } from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            query: queryReducer,
            websocket: websocketReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}
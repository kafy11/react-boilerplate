import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import queryReducer from '../reducers/query.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            query: queryReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}
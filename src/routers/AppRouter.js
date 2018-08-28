import React from 'react';
import { Router, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import MiniToad from '../pages/MiniToad/index';
import PublicRoute from './PublicRoute';

//cria histórico da navegação
export const history = createHistory();

//cria as rotas das urls
const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path='/' component={MiniToad} exact={true} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
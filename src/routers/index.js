import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Loadable from 'react-loadable';
import PrivateRoute from './PrivateRoute';
import Splash from '../pages/Splash';

export const history = createHistory({
    basename: BASENAME
});

const Filezilla = Loadable({
    loader: () => import('../pages/Filezilla'),
    loading: () => Splash
});

const MiniToad = Loadable({
    loader: () => import('../pages/MiniToad'),
    loading: () => Splash
});

const Error = Loadable({
    loader: () => import('../pages/Error'),
    loading: () => Splash
});

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path='/' component={Splash} exact={true} />
                <PrivateRoute path='/minitoad' component={MiniToad} />
                <PrivateRoute path='/filezilla' component={Filezilla} />
                <Route path='/error' component={Error} exact={true} />
                <Route component={Error} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
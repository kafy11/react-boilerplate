import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import createHistory from 'history/createBrowserHistory';
import Loadable from 'react-loadable';
import PrivateRoute from './PrivateRoute';
import Splash from '../pages/Splash';
import { Loading } from '../components';

const StyledLoading = styled(Loading)`
    height: 100vh;
`;

export const history = createHistory({
    basename: BASENAME
});

const Filezilla = Loadable({
    loader: () => import('../pages/Filezilla'),
    loading: StyledLoading
});

const MiniToad = Loadable({
    loader: () => import('../pages/MiniToad'),
    loading: StyledLoading
});

const Error = Loadable({
    loader: () => import('../pages/Error'),
    loading: StyledLoading
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
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import createHistory from 'history/createBrowserHistory';
import Loadable from 'react-loadable';
import Splash from '../pages/Splash';
import { Loading } from '../components';

const StyledLoading = styled(Loading)`
    height: 100vh;
`;

export const history = createHistory({
    basename: BASENAME
});

const Error = Loadable({
    loader: () => import('../pages/Error'),
    loading: StyledLoading
});

const AppRouter = () => (
    <Router history={history}>
        <Switch>
            <Route path='/' component={Splash} exact={true} />
            <Route path='/error' component={Error} exact={true} />
            <Route component={Error} />
        </Switch>
    </Router>
);

export default AppRouter;
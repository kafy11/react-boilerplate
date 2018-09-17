import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ company, component: Component, ...rest }) => (
    <Route {...rest} component={(props) => (
        company ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
        )
    )} 
    />
);

const mapStateToProps = (state) => ({
    company: state.websocket.name
});

export default connect(mapStateToProps)(PrivateRoute);
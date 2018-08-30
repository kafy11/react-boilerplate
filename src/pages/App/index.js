import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { connect } from 'react-redux';
import theme from '../../themes';
import Error from './Error';
import MiniToad from '../MiniToad';

const Background = styled.div`
    background-color: ${theme.palette.primary};
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${theme.palette.white};
`;

const Text = styled.span`
    color: ${theme.palette.white};
    font-family: ${theme.font};
    font-size: ${theme.sizes.regular};
    margin-top: ${theme.spacing.large}px;
`;

const App = ({ company, error }) => {
    if(error) {
        return <Error msg={error} />;
    } else if(company) {
        return <MiniToad />
    }

    return (
        <Background>
            <Spinner 
                name="ball-scale-ripple-multiple" 
                color={theme.palette.white} 
                fadeIn="none"
            />

            <Text>Tentando conectar com a empresa</Text>
        </Background>
    );
}

const mapStateToProps = (state, props) => ({
    company: state.websocket.name,
    error: state.websocket.error
});

export default connect(mapStateToProps)(App);
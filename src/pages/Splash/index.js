import React, { Component } from 'react';
import styled from 'styled-components';
import theme from '../../themes';

//fundo azul da página
const Background = styled.div`
    ${theme.background.blue}
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${theme.palette.white};
`;

//texto estilizado
const Text = styled.span`
    color: ${theme.palette.white};
    font-family: ${theme.font};
    font-size: ${theme.sizes.regular};
    margin-top: ${theme.spacing.large}px;
`;

export default () => (
    <Background>
        <Text>Tela Splash</Text>
    </Background>
);
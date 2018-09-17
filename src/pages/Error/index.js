import React, { Component } from 'react';
import styled from 'styled-components';
import theme from '../../themes';
import { FaExclamationTriangle } from 'react-icons/fa';

//cria o fundo vermelho
const Background = styled.div`
    background-color: ${theme.palette.danger};
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${theme.palette.white};
`;

//cria o texto estilizado
const Text = styled.span`
    color: ${theme.palette.white};
    font-family: ${theme.font};
    font-size: ${theme.sizes.regular};
    margin-top: ${theme.spacing.large}px;
`;

//container para estilizar o icone
const WarnIcon = styled.span`
    color: ${theme.palette.white};
    font-size:64px;
`;

/* props:
    location.state.message - texto para exibir(passado pelo history.push do route)
*/
export default class ErrorPage extends Component{
    render() {
        const message = (this.props.location.state && this.props.location.state.message);

        return (
            <Background>
                <WarnIcon><FaExclamationTriangle /></WarnIcon>
                <Text>{(message) ? message : 'Página não encontrada'}</Text>
            </Background>
        );
    }
} 
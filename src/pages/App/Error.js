import React from 'react';
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
    msg - texto para exibir
*/
export default ({ msg }) => {
    return (
        <Background>
            <WarnIcon><FaExclamationTriangle /></WarnIcon>
            <Text>{msg}</Text>
        </Background>
    );
}
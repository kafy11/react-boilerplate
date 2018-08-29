import React from 'react';
import styled from 'styled-components';
import theme from '../../themes';
import { FaExclamationTriangle } from 'react-icons/fa';

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

const Text = styled.span`
    color: ${theme.palette.white};
    font-family: ${theme.font};
    font-size: ${theme.sizes.regular};
    margin-top: ${theme.spacing.large}px;
`;

const WarnIcon = styled.span`
    color: ${theme.palette.white};
    font-size:64px;
`;

export default ({ msg }) => {
    return(
        <Background>
            <WarnIcon><FaExclamationTriangle /></WarnIcon>
            <Text>{msg}</Text>
        </Background>
    );
}
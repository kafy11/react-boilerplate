import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import theme from '../themes';

//container que centraliza o spinner
const SpinnerContainer = styled.div` 
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.light};
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.small}px;
`;

/* props:
    data - dados do resultado
    running - mostra o loading
*/
export default ({ color }) => (
    <SpinnerContainer>
        <Spinner 
            name="ball-spin-fade-loader" 
            color={color || theme.palette.primary} 
            fadeIn="none"
        />
    </SpinnerContainer>
)
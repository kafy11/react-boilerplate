import React from 'react';
import styled from 'styled-components';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem 
} from 'reactstrap';
import theme from '../themes';

const CenterContent = styled.div`
    margin: 0 ${theme.spacing.small}px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

//cria um componente estilizado para o header
const Header = styled.div`
    align-items: center;
    background-color: ${theme.palette.primary};
    box-sizing: border-box;
    color: ${theme.palette.white};
    display: flex;
    flex-direction: row;
    min-height: 48px;
    max-height: 48px;
    justify-content: flex-start;
    padding: ${theme.spacing.small}px;
    width: 100%;
`;

/* props:
    leftContent - conteúdo para colocar a esquerda
    centerContent - conteúdo do centro
    rightContent - conteúdo para colocar a direita
*/
export default ({ leftContent, centerContent, rightContent }) => (
    <Header>
        {leftContent} 
        
        <CenterContent>{centerContent}</CenterContent>

        {rightContent}
    </Header>
);
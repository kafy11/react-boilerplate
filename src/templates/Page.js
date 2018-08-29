import React, { Component } from 'react';
import theme from '../themes';
import styled from 'styled-components';

//componente estilizado para o título
const Title = styled.b`
    margin-left: ${theme.spacing.small}px;
    flex: 1;
`;

//componente estilizado para organizar o header e content da página
const ContentContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

//componente estilizado para o conteúdo da página
const PageContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${theme.palette.light};
    display: flex;
    flex-direction: column;
`;

const PullRightContainer = styled.div`
    align-self: flex-end;
`;

export default ({ children, title, headerColor, headerTextColor, leftContentHeader, rightContentHeader }) => {
    //cria um componente estilizado para o header
    const Header = styled.div`
        align-items: center;
        background-color: ${headerColor};
        box-sizing: border-box;
        color: ${headerTextColor};
        display: flex;
        flex-direction: row;
        font-family: ${theme.font};
        height: 48px;
        justify-content: flex-start;
        padding: ${theme.spacing.small}px;
        width: 100%;
    `;

    return (
        <ContentContainer>
            <Header>
                {leftContentHeader} 
                <Title>{title}</Title>
                {rightContentHeader}
            </Header>

            <PageContainer>
                {children}
            </PageContainer>
        </ContentContainer>
    );
}
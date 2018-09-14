import React from 'react';
import theme from '../themes';
import styled from 'styled-components';

const Company = styled.b`
    margin: 0 ${theme.spacing.small}px;
    color: ${theme.palette.warning};
    font-size: ${theme.sizes.big};
    flex: 1;
`;

//componente estilizado para organizar o header e content da página
const ContentContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: ${theme.sizes.regular};
    font-family: ${theme.font};
`;

//componente estilizado para o conteúdo da página
const PageContainer = styled.div`
    flex: 1;
    width: 100%;
    background-color: ${theme.palette.light};
    display: flex;
    flex-direction: column;
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
    children - conteúdo da página
    title - título da página
    leftContentHeader - conteúdo para colocar a esquerda do titulo
    rightContentHeader - conteúdo para colocar a direita do título
*/
export default ({ children, leftContentHeader, rightContentHeader, company }) => {
    return (
        <ContentContainer>
            <Header>
                {leftContentHeader} 
                <Company>{company}</Company>
                {rightContentHeader}
            </Header>

            <PageContainer>
                {children}
            </PageContainer>
        </ContentContainer>
    );
}
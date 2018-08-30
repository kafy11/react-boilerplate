import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { Table } from '../../components';
import theme from '../../themes';

//Container da página
const PageContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.light};
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.small}px;
`;

//container que centraliza o spinner
const SpinnerContainer = PageContainer.extend` 
    justify-content: center;
    align-items: center;
`;

//renderiza o conteúdo englobado pelo PageContainer
const renderContent = (content) => (
    <PageContainer>
        {content}
    </PageContainer>
);

/* props:
    data - dados do resultado
    running - mostra o loading
*/
export default ({ data, running }) => {
    //mostra o loading
    if(running) {
        return (
            <SpinnerContainer>
                <Spinner 
                    name="ball-spin-fade-loader" 
                    color={theme.palette.primary} 
                    fadeIn="none"
                />
            </SpinnerContainer>
        );
    }

    //se o dado estiverem vazio
    if(!data) {
        return renderContent('Nenhum resultado!');
    }

    //se for uma string
    if(typeof(data) == 'string') {
        return renderContent(data);
    }

    //se for o booleano true
    if(data === true){
        return renderContent("Query executada");
    }

    return renderContent(<Table data={data} />);
}
import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { Table } from '../../components';
import theme from '../../themes';

const PageContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.light};
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.small}px;
`;

const SpinnerContainer = PageContainer.extend` 
    justify-content: center;
    align-items: center;
`;

const renderContent = (content) => (
    <PageContainer>
        {content}
    </PageContainer>
);

export default ({ data, running }) => {
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

    if(!data) {
        return renderContent('Nenhum resultado!');
    }

    if(typeof(data) == 'string') {
        return renderContent(data);
    }

    if(data === true){
        return renderContent("Query executada");
    }

    return renderContent(<Table data={data} />);
}
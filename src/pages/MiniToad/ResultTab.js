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

const renderContent = (content) => (
    <PageContainer>
        {content}
    </PageContainer>
);

export default ({ data, running }) => {
    if(running) {
        return renderContent(<Spinner name="ball-spin-fade-loader" color={theme.palette.primary} />);
    }

    if(!data) {
        return renderContent('Nenhum resultado!');
    }

    if(!data || typeof(data) == 'string') {
        return renderContent(data);
    }

    return renderContent(<Table data={data} />);
}
import React, { Component } from 'react';
import PageWithSidebar from '../../templates/PageWithSidebar';
import theme from '../../themes';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const QueryInput = styled.textarea`
    flex: 1
`;

export default class MiniToad extends Component{
    render() {
        return (
            <PageWithSidebar 
                sidebarContent={<Sidebar />}
                title="Mini Toad" 
                barColor={theme.palette.primary}
                barTextColor={theme.palette.white}
                headerColor={theme.palette.primary}
                headerTextColor={theme.palette.white}
            >
                <QueryInput />
            </PageWithSidebar>
        );
    }
}
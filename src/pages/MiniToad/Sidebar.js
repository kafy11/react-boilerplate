import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import styled from 'styled-components';
import theme from '../../themes';
import Select from '../../components/Select';

const OBJECT_OPTIONS = [
    { value: 'TABLE', label: 'Tabelas' },
    { value: 'VIEW', label: 'Views' },
    { value: 'PROCEDURE', label: 'Procedures' },
    { value: 'FUNCTION', label: 'Funções' },
    { value: 'JOB', label: 'Jobs' }
]; 

export default class Sidebar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            objects: [{
                name: 'Teste'
            },]
        };
    }

    render() {
        const SidebarContainer = styled.div`
            display:flex;
            flex-direction: column;
            height: 100%;
        `;

        const ObjectList = styled.ul`
            flex: 1;
            list-style: none;
            padding: 0;
        `;

        const ObjectItem = styled.li`
            background-color: ${theme.palette.white};
            color: ${theme.palette.black};
            padding: ${theme.spacing.small}px;
            border: 1px solid ${theme.palette.grayscale[0]};
        `;

        return (
            <SidebarContainer>
                <Select 
                    placeholder="Tipo de objeto"
                    options={OBJECT_OPTIONS}
                />
                
                <ObjectList>
                    <Scrollbars>
                        {this.state.objects.map((object) => <ObjectItem>{object.name}</ObjectItem>)}
                    </Scrollbars>
                </ObjectList>
                
            </SidebarContainer>
        );
    }
}
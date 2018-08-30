import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { Select } from '../../components';
import ObjectItem from './ObjectItem';
import theme from '../../themes';

const OBJECT_OPTIONS = [
    { value: 'TABLE', label: 'Tabelas' },
    { value: 'VIEW', label: 'Views' },
    { value: 'PROCEDURE', label: 'Procedures' },
    { value: 'FUNCTION', label: 'Funções' },
    { value: 'TRIGGER', label: 'Triggers' },
    { value: 'PROCOBJ', label: 'Jobs' }
]; 

const SidebarContainer = styled.div`
    display:flex;
    flex-direction: column;
    height: 100%;
`;

const ObjectList = styled.ul`
    flex: 1;
    list-style: none;
    padding: 0;
    margin-top: ${theme.spacing.small}px;
`;

const SpinnerContainer = SidebarContainer.extend` 
    justify-content: center;
    align-items: center;
`;

export default ({ objects, onOpenObject, onChangeType, selectedType, running }) => {
    const renderList = () => {
        if(objects) {
            return objects.map((object) => (
                <ObjectItem 
                    key={object.OBJECT_NAME}
                    data={object} 
                    onClick={onOpenObject}
                />
            ));
        }
    }

    if(running) {
        return (
            <SpinnerContainer>
                <Spinner 
                    name="ball-spin-fade-loader" 
                    color={theme.palette.white} 
                    fadeIn="none"
                />
            </SpinnerContainer>
        );
    }

    return (
        <SidebarContainer>
            <Select 
                placeholder="Tipo de objeto"
                value={selectedType}
                options={OBJECT_OPTIONS}
                onChange={onChangeType}
            />
            
            <ObjectList>
                <Scrollbars>
                    {renderList()}
                </Scrollbars>
            </ObjectList>
            
        </SidebarContainer>
    );
}
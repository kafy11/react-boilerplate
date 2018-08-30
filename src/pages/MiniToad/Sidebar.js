import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { Select } from '../../components';
import ObjectItem from './ObjectItem';
import theme from '../../themes';

//array de tipos de objetos do select
const OBJECT_OPTIONS = [
    { value: 'TABLE', label: 'Tabelas' },
    { value: 'VIEW', label: 'Views' },
    { value: 'PROCEDURE', label: 'Procedures' },
    { value: 'FUNCTION', label: 'Funções' },
    { value: 'TRIGGER', label: 'Triggers' },
    { value: 'PROCOBJ', label: 'Jobs' }
]; 

//container que engloba o conteúdo da barra lateral
const SidebarContainer = styled.div`
    display:flex;
    flex-direction: column;
    height: 100%;
`;

//lista de objetos
const ObjectList = styled.ul`
    flex: 1;
    list-style: none;
    padding: 0;
    margin-top: ${theme.spacing.small}px;
`;

//container que centraliza o spinner
const SpinnerContainer = SidebarContainer.extend` 
    justify-content: center;
    align-items: center;
`;

/* props:
    objects - array de objetos para a lista 
    onOpenObject - callback disparado no clique do objeto (params: dados do objeto)
    onChangeType - callback disparado ao selecionar um tipo de objeto (params: dados do tipo)
    selectedType - tipo de objeto selecionado
    running - mostra o loading
*/
export default ({ objects, onOpenObject, onChangeType, selectedType, running }) => {
    //renderiza a lista de objetos
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

    //mostra o spinner
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
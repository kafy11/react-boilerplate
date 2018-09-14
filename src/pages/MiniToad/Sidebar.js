import React, { Component } from 'react';
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

const ObjectsContainer = styled.div`
    flex: 1;
    padding: 0;
    display:flex;
    flex-direction: column;
    margin-top: ${theme.spacing.small}px;
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

//input de filtro dos objetos
const Filter = styled.input`
    width: 100%;
    padding: ${theme.spacing.xsmall}px;
    border-radius: ${theme.spacing.xsmall}px;
`;

/* props:
    objects - array de objetos para a lista 
    onOpenObject - callback disparado no clique do objeto (params: dados do objeto)
    onChangeType - callback disparado ao selecionar um tipo de objeto (params: dados do tipo)
    selectedType - tipo de objeto selecionado
    running - mostra o loading
*/
export default class Sidebar extends Component {

    constructor(props){
        super(props);
        this.state = {
            filter: ''
        };
    }

    //handle que pega o conteúdo do textarea
    handleFilterChange = (e) => {
        const filter = e.target.value;
        this.setState(() => ({ filter }));
    }

    //renderiza a lista de objetos
    renderList = () => {
        const { objects, onOpenObject } = this.props;
        if(objects) {
            //cria o regex para filtrar
            const filter = new RegExp(this.state.filter,'gi');

            return (
                <ObjectsContainer>
                    <Filter 
                        placeholder="Filtrar objetos"
                        value={this.state.filter}
                        onChange={this.handleFilterChange}
                    />
                    <ObjectList>
                        <Scrollbars>
                            {objects //filtra os objetos e gera os itens da lista
                                .filter((object) => object.OBJECT_NAME.match(filter))
                                .map((object) => (
                                    <ObjectItem 
                                        key={object.OBJECT_NAME}
                                        data={object} 
                                        onClick={onOpenObject}
                                    />
                            ))}
                        </Scrollbars>
                    </ObjectList>
                </ObjectsContainer>
            );
        }
    }

    render() {
        const { onChangeType, selectedType, running } = this.props;

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
                
                {this.renderList()}
            </SidebarContainer>
        );
    }
}
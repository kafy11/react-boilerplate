import React, { Component } from 'react';
import styled from 'styled-components';
import LaddaButton, { S, CONTRACT } from 'react-ladda';
import { Loading } from '../../components';
import theme from '../../themes';

//container da página
const PageContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${theme.palette.light};
    display: flex;
    flex-direction: column;
`;

//textarea
const QueryInput = styled.textarea`
    flex: 1;
    margin: ${theme.spacing.medium}px;
    resize: none;
`;

//container do botão no fim da página
const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    padding: ${theme.spacing.medium}px;
    padding-top: 0px;
`;

/* props: 
    onExecute - callback para o evento de click do botão executar(params: query do textarea)
    loadingQuery - mostra o loading da página
    running - mostra o loading do botão executar
*/
export default class QueryTab extends Component{
    constructor(props){
        super(props);
        /* cria o estado inicial 
            query - conteúdo do textarea
        */
        this.state = {
            query: ''
        };
    }

    //verifica se recebeu uma query do componente pai
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.query != this.props.query){
            this.setState({
                query: this.props.query
            });
        }
    }

    //handle que pega o conteúdo do textarea
    handleQueryChange = (e) => {
        const query = e.target.value;
        this.setState(() => ({ query }));
    }

    //handle que pega o click do botão executar e dispara o evento onExecute
    handleExecute = () => {
        this.props.onExecute(this.state.query);
    }

    render() {
        const { loadingQuery, running } = this.props;

        //exibe o loading da página
        if(loadingQuery){
            return <Loading />;
        }

        return (
            <PageContainer>
                <QueryInput 
                    value={this.state.query}
                    onChange={this.handleQueryChange} 
                />
                <ButtonsContainer>
                    <LaddaButton
                        loading={running}
                        onClick={this.handleExecute}
                        data-color="blue"
                        data-size={S}
                        data-style={CONTRACT}
                        data-spinner-size={30}
                        data-spinner-color={theme.palette.white}
                        data-spinner-lines={12}
                    >
                        Executar
                    </LaddaButton>
                </ButtonsContainer>
            </PageContainer>
        );
    }
}
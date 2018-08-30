import React, { Component } from 'react';
import styled from 'styled-components';
import LaddaButton, { S, CONTRACT } from 'react-ladda';
import Spinner from 'react-spinkit';
import theme from '../../themes';

const PageContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${theme.palette.light};
    display: flex;
    flex-direction: column;
`;

const SpinnerContainer = PageContainer.extend` 
    justify-content: center;
    align-items: center;
`;

const QueryInput = styled.textarea`
    flex: 1;
    margin: ${theme.spacing.medium}px;
    resize: none;
`;

const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    padding: ${theme.spacing.medium}px;
    padding-top: 0px;
`;

export default class QueryTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            query: ''
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.query != this.props.query){
            this.setState({
                query: this.props.query
            });
        }
    }

    handleQueryChange = (e) => {
        const query = e.target.value;
        this.setState(() => ({ query }));
    }

    handleExecute = () => {
        this.props.onExecute(this.state.query);
    }

    render() {
        const { loadingQuery, running } = this.props;

        if(loadingQuery){
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
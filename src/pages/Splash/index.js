import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { connect } from 'react-redux';
import theme from '../../themes';
import Error from '../Error';
import { startConnectCompany } from '../../actions/websocket';
import { Select } from '../../components';

//fundo azul da página
const Background = styled.div`
    background-color: ${theme.palette.primary};
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${theme.palette.white};
`;

//texto estilizado
const Text = styled.span`
    color: ${theme.palette.white};
    font-family: ${theme.font};
    font-size: ${theme.sizes.regular};
    margin-top: ${theme.spacing.large}px;
`;

const SelectContainer = styled.div`
    width: 500px;
    max-width: 50%;
`;

/* state: 
    id: id da empresa selecionada no select,
    companies: empresas para o select 
*/
/* props:
    company - nome da empresa (para validar se conseguiu pegar já)
    error - mensagem de erro
*/
class Splash extends Component{
    constructor(props){
        super(props);
        this.state = {};

        const permissions = JSON.parse(sessionStorage.getItem('permissions') || '[]');

        if(permissions.indexOf('WEBSOCKET') == -1) {
            props.history.push({
                pathname: '/error', 
                state: {
                    message: 'Você não possui permissão para acessar'
                } 
            });
        }
    }

    componentDidUpdate(){
        //se a empresa foi conectada, redireciona para o minitoad
        if(this.props.company){
            this.props.history.push('/minitoad');
        }
    }

    //handle para o change do select de empresas
    handleChangeCompany = (option) => {
        this.setState(() => ({ companySelected: option }), () => this.props.startConnectCompany(option.value));
    }

    render() {
        const { companies } = this.props;

        //se empresa foi selecionada
        if(this.state.companySelected) {
            return (
                <Background>
                    <Spinner 
                        name="ball-scale-ripple-multiple" 
                        color={theme.palette.white} 
                        fadeIn="none"
                    />
    
                    <Text>Tentando conectar com a empresa</Text>
                </Background>
            );
        //se foi carregado a lista de empresas
        } else if(companies) {
            const options = companies.map((company) => ({
                value: company.ID_COMPANY_PK,
                label: company.COMPANY_NAME
            }));

            return (
                <Background>
                    <SelectContainer>
                        <Select 
                            placeholder="Empresa"
                            options={options}
                            onChange={this.handleChangeCompany}
                        />
                    </SelectContainer>
                </Background>
            )
        }

        return (
            <Background>
                <Spinner 
                    name="ball-scale-ripple-multiple" 
                    color={theme.palette.white} 
                    fadeIn="none"
                />

                <Text>Pegando lista de empresas</Text>
            </Background>
        );
    }
}

//passa o state global para os props
const mapStateToProps = (state) => ({
    companies: state.websocket.companies,
    company: state.websocket.name,
});

//passa os disparadores das ações por props
const mapDispatchToProps = {
    startConnectCompany,
};

//exporta o component com redux
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
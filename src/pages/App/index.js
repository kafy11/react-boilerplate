import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { connect } from 'react-redux';
import theme from '../../themes';
import Error from './Error';
import MiniToad from '../MiniToad';

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

/* props:
    company - nome da empresa (para validar se conseguiu pegar já)
    error - mensagem de erro
*/
const App = ({ company, error }) => {
    // se deu erro, exibe
    //se conseguiu pegar a empresa, vai para o minitoad
    if(error) {
        return <Error msg={error} />;
    } else if(company) {
        document.title = company + ' - ' + document.title;
        return <MiniToad />
    }

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
}

//passa o state global para os props
const mapStateToProps = (state, props) => ({
    company: state.websocket.name,
    error: state.websocket.error
});

//exporta o component com redux
export default connect(mapStateToProps)(App);
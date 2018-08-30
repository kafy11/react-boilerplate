import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import { Button } from 'reactstrap';
import { FaBars } from 'react-icons/fa';
import theme from '../themes';
import styled from 'styled-components';
import Page from './Page';

//cria um componente estilizado para o container da barra lateral
const SidebarContainer = styled.div`
    height: 100%;
    box-sizing: border-box;
    padding: ${theme.spacing.small}px;
    min-width: 250px;
    max-width: 250px;
    font-family: ${theme.font};
    font-size: ${theme.sizes.regular};
    background-color: ${theme.palette.primary};
    color: ${theme.palette.white};
`;

//cria um componente que define a cor do texto (usado para o icone)
const ColorProvider = styled.div`
    color: ${theme.palette.white};
`;

//cria o media query
const mql = window.matchMedia(`(min-width: 800px)`);

export default class PageWithSidebar extends Component{
    constructor(props) {
        super(props);

        /* cria o estado inicial do componente
            bigScreen - se é tela grande ou não 
            sidebarOpen - se barra lateral está aberta ou não
        */
        this.state = {
            bigScreen: mql.matches,
            sidebarOpen: false
        };
    }

    //verifica se o componente pai mandou abrir/fechar a barra lateral
    componentDidUpdate(prevProps){
        if(!this.state.bigScreen && prevProps.sidebarOpened != this.props.sidebarOpened) {
            this.setState({ sidebarOpen: this.props.sidebarOpened });
        }
    }

    //quando componente inicia, seta o listener do media query
    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    //quando componente sai, remove o listener do media query
    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged);
    }

    //evento que abre/fecha a barra lateral
    //params:
    //open - boolean - (true: abre barra lateral, false: fecha barra lateral)
    onSetSidebarOpen = (open) => {
        const { onSidebarToggle } = this.props;

        if(onSidebarToggle){
            onSidebarToggle(open);
        }

        this.setState(() => ({ sidebarOpen: open }));
    }

    //quando media query definido no começo do arquivo muda, 
    //passa se a media query foi atendida ou não para o state (mql.matches)
    mediaQueryChanged = () => {
        this.setState(() => ({ bigScreen: mql.matches, sidebarOpen: false }));
    }

    //se for uma tela pequena, mostra o botão
    renderButton() {
        if(!this.state.bigScreen) {
            return (
                <Button 
                    color="link"
                    onClick = {() => this.onSetSidebarOpen(true)}
                >
                    <ColorProvider><FaBars /></ColorProvider>
                </Button>
            );
        }
    }

    //renderiza o conteúdo da barra lateral
    renderSidebarContent = () => (
        <SidebarContainer>
            {this.props.sidebarContent}
        </SidebarContainer>
    )

    render() {
        return (
            <Sidebar
                sidebar={this.renderSidebarContent()}
                open={this.state.sidebarOpen}
                docked={this.state.bigScreen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { zIndex: 999 } }}
            >
                <Page {...this.props} leftContentHeader={this.renderButton()} />
            </Sidebar>
        );
    }
}
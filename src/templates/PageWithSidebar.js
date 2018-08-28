import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import LaddaButton, { XS } from 'react-ladda';
import { FaBars } from 'react-icons/fa';
import theme from '../themes';
import styled from 'styled-components';

//cria o media query
const mql = window.matchMedia(`(min-width: 800px)`);

//componente estilizado para o título
const Title = styled.b`
    margin-left: ${theme.spacing.small}px;
`;

//componente estilizado para organizar o header e content da página
const ContentContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

//componente estilizado para o conteúdo da página
const PageContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: ${theme.spacing.small}px;
    background-color: ${theme.palette.light};
    box-sizing: border-box;
`;

export default class PageWithSidebar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            bigScreen: mql.matches,
            sidebarOpen: false
        };
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
                <LaddaButton 
                    loading={false} 
                    onClick = {() => this.onSetSidebarOpen(true)} 
                    data-color={theme.palette.light}
                    data-size={XS}
                >
                    <FaBars />
                </LaddaButton>
            );
        }
    }

    //renderiza o conteúdo da barra lateral
    renderSidebarContent() {
        const { sidebarContent, barColor, barTextColor } = this.props;

        //cria um componente estilizado para o container da barra lateral
        const SidebarContainer = styled.div`
            height: 100%;
            box-sizing: border-box;
            background-color: ${barColor};
            color: ${barTextColor};
            padding: ${theme.spacing.small}px;
            width: 250px;
            max-width: 250px;
            font-family: ${theme.font};
        `;

        return (
            <SidebarContainer>
                {sidebarContent}
            </SidebarContainer>
        );
    }

    render() {
        const { children, title, headerColor, headerTextColor } = this.props; 

        //cria um componente estilizado para o header
        const Header = styled.div`
            background-color: ${headerColor};
            color: ${headerTextColor};
            padding: ${theme.spacing.small}px;
            width: 100%;
            display: flex;
            flex-direction: row;
            height: 32px;
            justify-content: flex-start;
            align-items: center;
            font-family: ${theme.font};
        `;

        return (
            <Sidebar
                sidebar={this.renderSidebarContent()}
                open={this.state.sidebarOpen}
                docked={this.state.bigScreen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { zIndex: 999 } }}
            >
                <ContentContainer>
                    <Header>
                        {this.renderButton()} 
                        <Title>{title}</Title>
                    </Header>

                    <PageContainer>
                        {children}
                    </PageContainer>
                </ContentContainer>
            </Sidebar>
        );
    }
}
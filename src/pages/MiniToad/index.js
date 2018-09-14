import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageWithSidebar from '../../templates/PageWithSidebar';
import { startQuery, startSelect, startListObjects, startGetDDL } from '../../actions/query';
import { Tabs } from '../../components';
import Sidebar from './Sidebar';
import QueryTab from './QueryTab';
import ResultTab from './ResultTab';

/* props:
    data - dados do resultado da query
    running - mostra loading da aba de resultados
    objects - dados da lista de objetos
    runningListObj - mostra o loading da lista de objetos
    ddl - dados do ddl aberto
    runningGetDDL - mostra o loading da aba de query
*/
class MiniToad extends Component{
    constructor(props){
        super(props);

        /* Cria o estado inicial da tela
            activeTab: aba ativa da tela (0 - QueryTab, 1 - ResultTab)
            selectedType: tipo de objeto selecionado na barra lateral
            sidebarOpened: se barra lateral está aberta ou não
        */
        this.state = {
            activeTab: 0,
            selectedType: null,
            sidebarOpened: false
        };
    }

    //Verifica se recebeu uma nova ddl e muda para a aba da query
    componentDidUpdate(prevProps,prevState){
        if(prevProps.ddl != this.props.ddl) {
            this.setState({
                activeTab: 0
            });
        }
    }

    //handle do clique do botão Executar
    //verifica se é select ou query e chama as ação certa
    //depois muda para a aba de resultados
    handleExecute = (query) => {
        const { startQuery, startSelect } = this.props;

        if(query.toUpperCase().trim().startsWith('SELECT')){
            startSelect(query);
        } else {
            startQuery(query);
        }
        
        this.handleChangeTab(1);
    }

    //handle para pegar a aba ativa e garantir sempre o estado sempre esteja atualizado
    handleChangeTab = (tab) => {
        this.setState(() => ({
            activeTab: tab
        }));
    }

    //handle para pegar o estado da barra lateral e garantir sempre que o estado esteja atualizado
    handleSidebarToggle = (opened) => {
        this.setState(() => ({
            sidebarOpened: opened
        }));
    }

    //handle para pegar o estado do select de tipo de objeto e garantir sempre que o estado esteja atualizado
    handleChangeType = (type) => {
        this.props.startListObjects(type.value);
        this.setState(() => ({ selectedType: type }));
    }

    //handle para o clique do objeto na barra lateral
    //inicia a ação de getDDL e fecha a barra lateral
    handleOpenObject = (object) => {
        this.props.startGetDDL(this.state.selectedType.value,object.OBJECT_NAME);
        this.setState(() => ({ sidebarOpened: false }));
    }

    //renderiza o conteúdo da barra lateral
    renderSidebar = () => {
        const { objects, runningListObj } = this.props;
        return (
            <Sidebar 
                objects={objects} 
                selectedType={this.state.selectedType}
                running={runningListObj} 
                onChangeType={this.handleChangeType} 
                onOpenObject={this.handleOpenObject}
            />
        );
    }

    render() {
        const { data, running, runningGetDDL, ddl, company } = this.props;

        //cria o array das abas
        const tabs = [{
            content: <QueryTab 
                        onExecute={this.handleExecute}
                        running={running}
                        loadingQuery={runningGetDDL} 
                        query={ddl}
                    />,
            navContent: "Executar"
        },{
            content: <ResultTab 
                        data={data} 
                        running={running} 
                    />,
            navContent: "Resultado"
        }];

        return (
            <PageWithSidebar 
                sidebarContent={this.renderSidebar()}
                sidebarOpened={this.state.sidebarOpened}
                onSidebarToggle={this.handleSidebarToggle}
                company={company}
            >
                <Tabs 
                    tabs={tabs} 
                    activeTab={this.state.activeTab}
                    onChangeTab={this.handleChangeTab}
                />
            </PageWithSidebar>
        );
    }
}

//passa as ações como props
const mapDispatchToProps = {
    startQuery,
    startSelect,
    startListObjects,
    startGetDDL
};

//passa o state do redux para props
const mapStateToProps = (state) => ({
    company: state.websocket.name,
    data: state.query.data,
    running: state.query.running,
    objects: state.query.data_obj,
    runningListObj: state.query.running_obj,
    ddl: state.query.data_ddl,
    runningGetDDL: state.query.running_ddl,
});

//exporta o componente com o redux
export default connect(mapStateToProps, mapDispatchToProps)(MiniToad);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageWithSidebar from '../../templates/PageWithSidebar';
import theme from '../../themes';
import { startQuery, startSelect, startListObjects, startGetDDL } from '../../actions/query';
import { Tabs } from '../../components';
import Sidebar from './Sidebar';
import QueryTab from './QueryTab';
import ResultTab from './ResultTab';

class MiniToad extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTab: 0,
            selectedType: null,
            sidebarOpened: false
        };
    }

    componentDidUpdate(prevProps,prevState){
        if(prevProps.ddl != this.props.ddl) {
            this.setState({
                activeTab: 0
            });
        }
    }

    handleExecute = (query) => {
        const { startQuery, startSelect } = this.props;

        if(query.toUpperCase().startsWith('SELECT')){
            startSelect(query);
        } else {
            startQuery(query);
        }
        
        this.handleChangeTab(1);
    }

    handleChangeTab = (tab) => {
        this.setState(() => ({
            activeTab: tab
        }));
    }

    handleSidebarToggle = (opened) => {
        this.setState(() => ({
            sidebarOpened: opened
        }));
    }

    handleChangeType = (type) => {
        this.props.startListObjects(type.value);
        this.setState(() => ({ selectedType: type }));
    }

    handleOpenObject = (object) => {
        this.props.startGetDDL(this.state.selectedType.value,object.OBJECT_NAME);
        this.setState(() => ({ sidebarOpened: false }));
    }

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
        const { data, running, runningGetDDL, ddl } = this.props;

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
                title="Mini Toad" 
                sidebarOpened={this.state.sidebarOpened}
                onSidebarToggle={this.handleSidebarToggle}
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

const mapDispatchToProps = {
    startQuery,
    startSelect,
    startListObjects,
    startGetDDL
};

const mapStateToProps = (state) => ({
    data: state.query.data,
    running: state.query.running,
    objects: state.query.data_obj,
    runningListObj: state.query.running_obj,
    ddl: state.query.data_ddl,
    runningGetDDL: state.query.running_ddl,
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniToad);
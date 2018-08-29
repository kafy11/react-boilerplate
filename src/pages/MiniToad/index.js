import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageWithSidebar from '../../templates/PageWithSidebar';
import theme from '../../themes';
import { startQuery, startSelect } from '../../actions/query';
import { Tabs } from '../../components';
import Sidebar from './Sidebar';
import QueryTab from './QueryTab';
import ResultTab from './ResultTab';

class MiniToad extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTab: 0
        };
    }

    handleExecute = (query) => {
        const { startQuery, startSelect } = this.props;

        if(query.toUpperCase().startsWith('SELECT')){
            startSelect(query);
        } else {
            startQuery(query);
        }
        
        this.setState(() => ({
            activeTab: 1
        }));
    }

    handleChangeTab = (tab) => {
        this.setState(() => ({
            activeTab: tab
        }));
    }

    render() {
        const { data, running } = this.props;

        const tabs = [{
            content: <QueryTab 
                        onExecute={this.handleExecute}
                        running={running}
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
                sidebarContent={<Sidebar />}
                title="Mini Toad" 
                barColor={theme.palette.primary}
                barTextColor={theme.palette.white}
                headerColor={theme.palette.primary}
                headerTextColor={theme.palette.white}
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
    startSelect
};

const mapStateToProps = (state, props) => ({
    data: state.query.data,
    running: state.query.running
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniToad);
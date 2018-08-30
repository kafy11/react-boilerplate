import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import styled from 'styled-components';

//container para as abas
const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

/* props:
    tabs - array na estrutura [][content -> conteúdo da página da aba, navContent -> conteúdo do titulo]
    activeTab - aba ativa
*/
export default class Tabs extends React.Component {
    constructor(props) {
        super(props);

        /*define o estado inicial
            activeTab - aba ativa
        */
        this.state = {
            activeTab: (props.activeTab !== undefined) ? props.activeTab : 0
        };
    }

    //pega a aba ativa
    getActiveTab = () => {
        return (this.props.activeTab !== undefined) ? this.props.activeTab : this.state.activeTab;
    }

    //handle do clique da aba
    toggle = (tab) => {
        const { onChangeTab } = this.props;

        if (this.getActiveTab() !== tab) {
            if(onChangeTab) {
                onChangeTab(tab);
            }

            this.setState({
                activeTab: tab
            });
        }
    }

    //renderiza o conteúdo das abas
    renderTabContent(){
        return this.props.tabs.map((tab,i) => (
            <TabPane className="h-100" tabId={i} key={i}>{tab.content}</TabPane>
        ));
    }

    //renderiza o conteúdo do titulo das abas
    renderTabNav(){
        const activeTab = this.getActiveTab();

        return this.props.tabs.map((tab,i) => (
            <NavItem key={i}>
                <NavLink 
                    className={classnames({ active: activeTab === i })}
                    onClick={() => { this.toggle(i); }}
                >
                    {tab.navContent}
                </NavLink>
            </NavItem>
        ));
    }

    render() {
        const activeTab = this.getActiveTab();

        return (
            <Container>
                <Nav tabs>
                    {this.renderTabNav()}
                </Nav>
                <TabContent className="h-100" activeTab={activeTab}>
                    {this.renderTabContent()}
                </TabContent>
            </Container>
        );
    }
}

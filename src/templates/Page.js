import React, { Component } from 'react';
import styled from 'styled-components';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem 
} from 'reactstrap';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import theme from '../themes';
import { Header } from '../components';

const Company = styled.b`
    margin: 0 ${theme.spacing.small}px;
    color: ${theme.palette.warning};
    font-size: ${theme.sizes.big};
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

//componente estilizado para organizar o header e content da página
const ContentContainer = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: ${theme.sizes.regular};
    font-family: ${theme.font};
`;

//componente estilizado para o conteúdo da página
const PageContainer = styled.div`
    flex: 1;
    width: 100%;
    background-color: ${theme.palette.light};
    display: flex;
    flex-direction: column;
`;

const StyledFaBars = styled(FaBars)`
    font-size: 1rem;
`

const NAV_ITEMS = [{
    to: '/minitoad',
    label: 'Minitoad'
},{
    to: '/filezilla',
    label: 'Filezilla'
}];

/* props:
    children - conteúdo da página
    company - nome da empresa
    leftContentHeader - conteúdo para colocar a esquerda do titulo
    rightContentHeader - conteúdo para colocar a direita do título
    className - classes passadas por styled()
*/
export default class Page extends Component {
    renderNavCollapsed = () => (
        <UncontrolledDropdown>
            <DropdownToggle nav>
                <StyledFaBars color={theme.palette.white}/>
            </DropdownToggle>
            <DropdownMenu right>
                {NAV_ITEMS.map(({ label, to }, i) => (
                    <DropdownItem key={i + ''}>
                        <Link to={to}>{label}</Link>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </UncontrolledDropdown>
    )

    render() {
        const { children, leftContentHeader, rightContentHeader, company, className } = this.props;
        return (
            <ContentContainer>
                <Header 
                    leftContent={leftContentHeader}
                    centerContent={(
                        <Company title={company}>
                            {company}
                        </Company>
                    )}
                    rightContent={(
                        <div>
                            {this.renderNavCollapsed()}
                            {rightContentHeader}
                        </div>
                    )}
                />

                <PageContainer className={className}>
                    {children}
                </PageContainer>
            </ContentContainer>
        );
    }
}
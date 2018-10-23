import React, { Component } from 'react';
import styled from 'styled-components';
import { FaEllipsisV } from 'react-icons/fa';
import Button from './Button';

const DropdownToggle = styled(Button)`
    position:relative;
`;

const DropdownMenu = styled.ul`
    position:absolute;
    right: 0;
    background-color: ${({ theme }) => theme.palette.light};
    border: 1px solid ${({ theme }) => theme.palette.grayscale[0]};
    color: black;
    list-style: none;
    padding: 0;
    border-radius: 0.25rem;
    top: 100%;
    text-align: left;
    z-index: 2;
`;

export default class ButtonDropdown extends Component {
    constructor(props){
        super(props);
        this.state = {
            opened: false
        };
    }

    toggle = () => this.setState(() => ({ opened: !this.state.opened }));
    close = () => this.setState(() => ({ opened: false }));

    renderDropdown(){
        if(this.state.opened) {
            return <DropdownMenu>{this.props.children}</DropdownMenu>;
        }
    }

    renderLabel(){
        const { label } = this.props;

        return (label) ? label : <FaEllipsisV />;
    }

    render(){
        const { type } = this.props;

        return (
            <DropdownToggle 
                type={type}
                onClick={this.toggle}
                onBlur={this.close}
            >
                {this.renderLabel()}
                {this.renderDropdown()}
            </DropdownToggle>
        );
    }
}
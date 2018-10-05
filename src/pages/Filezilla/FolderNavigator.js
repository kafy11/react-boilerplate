import React, { Component } from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import FolderItem from './FolderItem';

const Container = styled.div`
    padding: ${({ theme }) => theme.spacing.small}px;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const FolderList = styled.ul`
    list-style: none;
    padding: 0;
    background-color: ${({ theme }) => theme.palette.white};
    border: 1px solid ${({ theme }) => theme.palette.grayscale[1]};
    border-radius: ${({ theme }) => theme.spacing.xsmall}px;
    margin: ${({ theme }) => theme.spacing.xsmall}px 0;
    flex: 1;
`;

//input da path da folder
const FolderPath = styled.input`
    width: 100%;
    padding: ${({ theme }) => theme.spacing.xsmall}px;
    border-radius: ${({ theme }) => theme.spacing.xsmall}px;
`;

export default class FolderNavigator extends Component {
    constructor(props){
        super(props);
        this.state = {
            path: props.path
        };
    }

    handleChange = (e) => {
        const path = e.target.value;
        this.setState(() => ({ path }));
    };

    handleKeyPress = (e) => {
        if(e.keyCode == 13){
            if(e.target.value && e.target.value.length > 0){
                this.props.onChangeFolder(e.target.value);
            }
        }
    };

    handleItemClick = ({ name, isFolder }) => {
        const path = this.props.path + '/' + name;
        if(isFolder) {
            this.props.onChangeFolder(path);
        } else {
            this.props.onOpenFile(path);
        }
    }

    renderContent = () => {
        const { content } = this.props;

        if(content) {
            return content.map((item, i) => (
                <FolderItem 
                    key={i + ''} 
                    {...item} 
                    onClick={this.handleItemClick}
                />
            ));
        }
    }

    render() {
        return (
            <Container>
                <FolderPath 
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyPress} 
                    value={this.state.path}
                />
                <FolderList>
                    <Scrollbars>
                        <FolderItem 
                            name=".." 
                            isFolder={true} 
                            onClick={this.handleItemClick} 
                        />
                        {this.renderContent()}
                    </Scrollbars>
                </FolderList>
            </Container>
        );
    }
} 


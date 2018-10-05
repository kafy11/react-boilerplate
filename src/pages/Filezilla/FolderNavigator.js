import React, { Component } from 'react';
import styled from 'styled-components';
import FolderList from './FolderList';

const Container = styled.div`
    padding: ${({ theme }) => theme.spacing.small}px;
    display: flex;
    flex-direction: column;
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

    render() {
        const { content, onChangeFolder, onOpenFile, path } = this.props;

        return (
            <Container>
                <FolderPath 
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyPress} 
                    value={this.state.path}
                />

                <FolderList 
                    content={content}
                    path={path}
                    onChangeFolder={onChangeFolder}
                    onOpenFile={onOpenFile}
                />
            </Container>
        );
    }
} 


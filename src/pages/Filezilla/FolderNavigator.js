import React, { Component } from 'react';
import styled from 'styled-components';
import { FaPlus, FaUpload } from 'react-icons/fa';
import FolderList from './FolderList';
import NewFileModal from './NewFileModal';
import PublishZipModal from './PublishZipModal';
import { ButtonDropdown, DropdownItem } from '../../components';

const Container = styled.div`
    padding: ${({ theme }) => theme.spacing.small}px;
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
`;

//input da path da folder
const FolderPath = styled.input`
    flex:1;
    padding: ${({ theme }) => theme.spacing.xsmall}px;
    border-radius: ${({ theme }) => theme.spacing.xsmall}px;
    margin-right: ${({ theme }) => theme.spacing.xsmall}px;
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

    handleNewClick = () => this.setState(() => ({ showNewModal: true }));
    handleCloseNewModal = () => this.setState(() => ({ showNewModal: false }));
    handlePublishZipClick = () => this.setState(() => ({ showPublishZipModal: true }));
    handleClosePublishZipModal = () => this.setState(() => ({ showPublishZipModal: false }));

    handleNewSubmit = ({ name, isFolder }) => {
        const { path, onNewFile, onNewFolder } = this.props;
        const fullPath = path + '/' + name;

        if(isFolder) {
            onNewFolder(fullPath);
        } else {
            onNewFile(fullPath);
        }
    }

    handleOpen = ({ name, isFolder }) => {
        const { path, onChangeFolder, onOpenFile } = this.props;
        const fullPath = path + '/' + name;

        if(isFolder) {
            onChangeFolder(fullPath);
        } else {
            onOpenFile(fullPath);
        }
    }

    render() {
        const { content, onChangeFolder, onOpenFile, onPublishZip, onDelete } = this.props;

        return (
            <Container>
                <Header>
                    <FolderPath 
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyPress} 
                        value={this.state.path}
                    />
                    <ButtonDropdown 
                        type='primary'
                    >
                        <DropdownItem onClick={this.handleNewClick}><FaPlus /> Criar</DropdownItem>
                        <DropdownItem onClick={this.handlePublishZipClick}><FaUpload /> Publicar Zip</DropdownItem>
                    </ButtonDropdown>
                </Header>

                <FolderList 
                    content={content}
                    onOpen={this.handleOpen}
                    onChangeFolder={onChangeFolder}
                    onOpenFile={onOpenFile}
                    onDelete={onDelete}
                />

                <NewFileModal 
                    show={this.state.showNewModal}
                    onClose={this.handleCloseNewModal}
                    onSubmit={this.handleNewSubmit}
                />

                <PublishZipModal 
                    show={this.state.showPublishZipModal}
                    onClose={this.handleClosePublishZipModal}
                    onSubmit={onPublishZip}
                />
            </Container>
        );
    }
} 


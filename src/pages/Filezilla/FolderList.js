import React, { Component } from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import { ContextMenu, Item, ContextMenuProvider } from 'react-contexify';
import FolderItem from './FolderItem';
import NewFileModal from './NewFileModal';

const CONTEXT_MENU_ID = "navigator_context_menu";

const FolderList = styled.ul`
    list-style: none;
    padding: 0;
    background-color: ${({ theme }) => theme.palette.white};
    border: 1px solid ${({ theme }) => theme.palette.grayscale[1]};
    border-radius: ${({ theme }) => theme.spacing.xsmall}px;
    margin: ${({ theme }) => theme.spacing.xsmall}px 0;
    flex: 1;
`;

const FlexContextMenuProvider = styled(ContextMenuProvider)`
    flex:1;
    display: flex;
`;

export default class FolderNavigator extends Component {
    constructor(props){
        super(props);
        this.state = {
            path: props.path,
        };
    }

    handleItemClick = ({ name, isFolder }) => {
        const path = this.props.path + '/' + name;
        if(isFolder) {
            this.props.onChangeFolder(path);
        } else {
            this.props.onOpenFile(path);
        }
    }

    handleNewFileClick = () => this.setState(() => ({ showFileModal: true }));

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

    handleCloseFileModal = () => this.setState(() => ({ showFileModal: false }));

    render() {
        return (
            <>
                <FlexContextMenuProvider id={CONTEXT_MENU_ID}>
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
                </FlexContextMenuProvider>

                <ContextMenu id={CONTEXT_MENU_ID}>
                    <Item onClick={this.handleNewFileClick}>
                        Novo Arquivo
                    </Item>
                </ContextMenu>

                <NewFileModal 
                    show={this.state.showFileModal}
                    onClose={this.handleCloseFileModal}
                />
            </>
        );
    }
} 


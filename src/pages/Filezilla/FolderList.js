import React, { Component } from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import FolderItem from './FolderItem';
import DeleteModal from './DeleteModal';

const Container = styled.ul`
    list-style: none;
    padding: 0;
    background-color: ${({ theme }) => theme.palette.white};
    border: 1px solid ${({ theme }) => theme.palette.grayscale[1]};
    border-radius: ${({ theme }) => theme.spacing.xsmall}px;
    margin: ${({ theme }) => theme.spacing.xsmall}px 0;
    flex: 1;
`;

export default class FolderList extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    handleDeleteClick = (toDelete) => this.setState(() => ({ showDelModal: true, toDelete }));
    handleCloseDelModal = () => this.setState(() => ({ showDelModal: false }));
    handleSubmitDelModal = () => {
        this.setState(() => ({ showDelModal: false }));
        this.props.onDelete(this.state.toDelete);
    }

    renderContent = () => {
        const { content, onOpen } = this.props;

        if(content) {
            return content.map((item, i) => (
                <FolderItem 
                    key={i + ''} 
                    {...item} 
                    onClick={onOpen}
                    onDelete={this.handleDeleteClick}
                />
            ));
        }
    }

    render(){
        return (
            <Container>
                <Scrollbars>
                    <FolderItem 
                        name=".." 
                        isFolder={true} 
                        onClick={this.props.onOpen} 
                    />
                    {this.renderContent()}
                </Scrollbars>
    
                <DeleteModal 
                    {...this.state.toDelete}
                    show={this.state.showDelModal}
                    onClose={this.handleCloseDelModal}
                    onSubmit={this.handleSubmitDelModal}
                />
            </Container>
        );
    }
}


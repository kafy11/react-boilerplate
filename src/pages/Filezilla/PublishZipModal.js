import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FileUpload } from '../../components';

const FileInput = styled(FileUpload)`
    width: 100%;
`;

export default class PublishZipModal extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    handleChangeFile = (content) => this.setState(() => ({ file: content }));
    handleSubmit = () => {
        const { file } = this.state;

        if(file) {
            this.props.onSubmit(file);
        }
    }

    render() {
        const { onClose, show, className } = this.props;
    
        return (
            <Modal 
                isOpen={show} 
                toggle={onClose} 
                className={className}
            >
                <ModalHeader toggle={onClose}>Digite o nome da nova pasta ou arquivo</ModalHeader>
                <ModalBody>
                    <FileInput 
                        accept=".zip"
                        onChange={this.handleChangeFile}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="secondary" 
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        color="primary"
                        onClick={this.handleSubmit}
                    >
                        Publicar
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
} 
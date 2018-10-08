import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const NameInput = styled.input`
    width: 100%;
`;

export default class NewFileModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: ''
        };
    }

    handleChangeName = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    }

    handleSubmit = () => {
        const { name } = this.state;

        if(name){
            this.props.onSubmit({
                name,
                isFolder: (name.indexOf('.') == -1)
            });
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
                    <NameInput 
                        type="Text" 
                        value={this.state.name}
                        onChange={this.handleChangeName}
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
                        Continuar
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
} 
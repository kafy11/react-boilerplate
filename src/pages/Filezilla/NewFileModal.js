import React from 'react';
import styled from 'styled-components';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const NameInput = styled.input`
    width: 100%;
`;

export default ({ onClose, show, className }) => (
    <Modal 
        isOpen={show} 
        toggle={onClose} 
        className={className}
    >
        <ModalHeader toggle={onClose}>Novo arquivo</ModalHeader>
        <ModalBody>
            <NameInput type="Text" />
        </ModalBody>
        <ModalFooter>
            <Button color="secondary">
                Cancelar
            </Button>
            <Button color="primary">
                Continuar
            </Button>
        </ModalFooter>
    </Modal>
);
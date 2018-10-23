import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default ({ onClose, show, className, name, onSubmit, isFolder }) => (
    <Modal 
        isOpen={show} 
        toggle={onClose} 
        className={className}
    >
        <ModalHeader toggle={onClose}>Tem certeza que deseja deletar {name}?</ModalHeader>
        {isFolder && <ModalBody>A pasta necessita estar vazia</ModalBody>}
        <ModalFooter>
            <Button 
                color="danger" 
                onClick={onClose}
            >
                Não
            </Button>
            <Button 
                color="success"
                onClick={onSubmit}
            >
                Sim
            </Button>
        </ModalFooter>
    </Modal>
);
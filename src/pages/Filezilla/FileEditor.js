import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { FaSave, FaChevronLeft } from 'react-icons/fa';
import theme from '../../themes';

//container da página
const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

//textarea
const FileInput = styled.textarea`
    flex: 1;
    margin: ${theme.spacing.small}px;
    margin-top: 0;
    resize: none;
`;

//container do header
const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: ${theme.spacing.small}px;
    align-items: center;
`;

//Container do título
const Title = styled.span`
    flex: 1;
    font-size: ${theme.sizes.big};
`;

//botão de voltar
const StyledBack = styled(FaChevronLeft)`
    font-size: 20px;
    margin-right: ${theme.spacing.small}px;
    cursor: pointer;
`;

export default class FileEditor extends Component {
    render() {
        const { content, path, onBack } = this.props;
    
        return (
            <Container>
                <Header>
                    <StyledBack onClick={onBack} />
                    <Title>{path}</Title>
                    
                    <Button 
                        color="primary"
                    >
                        <FaSave />
                    </Button>
                </Header>

                <FileInput 
                    value={content}
                />
            </Container>
        );
    }
}
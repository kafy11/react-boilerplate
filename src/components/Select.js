import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

export default (props) => {
    //container que corrige a cor do texto
    const SelectContainer = styled.div`
        color: ${({ theme }) => theme.palette.black};
    `;

    return (
        <SelectContainer>
            <Select {...props}/>
        </SelectContainer>
    );
}
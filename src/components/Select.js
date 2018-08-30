import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

//componente para corrigir o texto do plugin
// props são os usados pelo plugin react-select, 
// ver documentação para saber mais : http://react-select.com/home
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
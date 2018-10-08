import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

//container que corrige a cor do texto
const StyledSelect = styled(Select)`
    color: ${({ theme }) => theme.palette.black};
`;

//componente para corrigir o texto do plugin
export default (props) => <StyledSelect {...props}/>;
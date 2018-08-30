import React from 'react';
import styled from 'styled-components';
import theme from '../../themes';

//container do item do objeto
const ObjectItem = styled.li`
    background-color: ${theme.palette.white};
    color: ${theme.palette.black};
    padding: ${theme.spacing.small}px;
    border: 1px solid ${theme.palette.grayscale[0]};
    overflow: hidden;
    cursor: pointer;
`;

/* props:
    data - dados do objeto
    onClick - callback do clique no objeto
*/
export default ({ data, onClick }) => (
    <ObjectItem 
        title={data.OBJECT_NAME}
        onClick={() => onClick(data)}
    >
        {data.OBJECT_NAME}
    </ObjectItem>
);
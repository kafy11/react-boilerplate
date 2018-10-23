import React from 'react';
import styled from 'styled-components';
import { FaFile, FaFolder, FaTrash } from 'react-icons/fa';

const FolderItem = styled.li`
    padding: 0 ${({ theme }) => theme.spacing.xsmall}px;
    cursor: pointer;
    float: left;
    clear: both;
`;

const Icon = styled.span`
    margin-right: ${({ theme }) => theme.spacing.xsmall}px;
`;

const StyledFaFolder = styled(FaFolder)`
    color: ${({ theme }) => theme.palette.warning}
`;

const StyledFaFile = styled(FaFile)`
    color: ${({ theme }) => theme.palette.primary}
`;

const StyledFaTrash = styled(FaTrash)`
    color: ${({ theme }) => theme.palette.danger};
    margin-left: ${({ theme }) => theme.spacing.xsmall}px;
    font-size: ${({ theme }) => theme.sizes.xsmall};
`;

export default ({ name, isFolder, onClick, onDelete }) => (
    <FolderItem
        onClick={() => onClick({ name, isFolder })}
    >
        <Icon>
            {(isFolder) ? <StyledFaFolder /> : <StyledFaFile />}
        </Icon>
        
        {name}
        {onDelete && (<StyledFaTrash 
            onClick={(e) => {
                e.stopPropagation();
                onDelete({ name, isFolder });
            }}
        />)}
    </FolderItem>
);
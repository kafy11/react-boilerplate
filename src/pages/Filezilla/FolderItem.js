import React from 'react';
import styled from 'styled-components';
import { FaFile, FaFolder } from 'react-icons/fa';

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

export default ({ name, isFolder, onClick }) => (
    <FolderItem
        onClick={() => onClick({ name, isFolder })}
    >
        <Icon>
            {(isFolder) ? <StyledFaFolder /> : <StyledFaFile />}
        </Icon>
        
        {name}
    </FolderItem>
);
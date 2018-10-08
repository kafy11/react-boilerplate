import React from 'react';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import FolderItem from './FolderItem';

const FolderList = styled.ul`
    list-style: none;
    padding: 0;
    background-color: ${({ theme }) => theme.palette.white};
    border: 1px solid ${({ theme }) => theme.palette.grayscale[1]};
    border-radius: ${({ theme }) => theme.spacing.xsmall}px;
    margin: ${({ theme }) => theme.spacing.xsmall}px 0;
    flex: 1;
`;

export default ({ content, onOpen }) => {
    const renderContent = () => {
        if(content) {
            return content.map((item, i) => (
                <FolderItem 
                    key={i + ''} 
                    {...item} 
                    onClick={onOpen}
                />
            ));
        }
    }

    return (
        <FolderList>
            <Scrollbars>
                <FolderItem 
                    name=".." 
                    isFolder={true} 
                    onClick={onOpen} 
                />
                {renderContent()}
            </Scrollbars>
        </FolderList>
    );
}


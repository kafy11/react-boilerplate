import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaSyncAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { Loading, Button } from '../../components';
import Page from '../../templates/Page';
import FolderNavigator from './FolderNavigator';
import FileEditor from './FileEditor';
import { startListDir, startGetFile, setFileContent, startPublishFile, startPublishZip, startCreateDir, startDelete } from '../../actions/filezilla';
import { startRefresh } from '../../actions/websocket';

//cria um componente que define a cor do texto (usado para o icone)
const StyledFaSyncAlt = styled(FaSyncAlt)`
    color: ${({ theme }) => theme.palette.white};
`;

class Filezilla extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.handleChangeDir('.');
    }

    handleChangeDir = (path) => {
        this.setState(() => ({ currFolder: path }));
        this.props.startListDir(path);
    }

    handleOpenFile = (path) => {
        this.setState(() => ({ openedFile: path }), () => {
            this.props.startGetFile(path);
        });
    }

    handleBackFile = () => {
        this.setState(() => ({ openedFile: undefined }), () => {
            this.props.setFileContent('');
        });
    };

    handleNewFile = (path) => this.setState(() => ({ openedFile: path }));
    handleNewFolder = (path) => {
        this.props.startCreateDir(path);
        this.setState(() => ({ currFolder: path }));
        this.props.startListDir(path);
    }

    handleSaveFile = (content) => {
        const { startPublishFile, startListDir } = this.props;
        const { openedFile, currFolder } = this.state;

        startPublishFile({ 
            file: openedFile,
            content
        });
        startListDir(currFolder);
        this.setState(() => ({ openedFile: undefined }));
    }

    handlePublishZip = (content) => {
        const { startPublishZip, startListDir } = this.props;
        const { currFolder } = this.state;

        startPublishZip({
            content,
            path: currFolder
        });
        startListDir(currFolder);
    }

    handleDelete = ({ name, isFolder }) => {
        const { startDelete, startListDir } = this.props;
        const { currFolder } = this.state;

        startDelete({ 
            path: currFolder + '/' + name,
            isFolder
        });
        startListDir(currFolder);
    }

    renderRefresh = () => (
        <Button 
            link
            onClick={this.props.startRefresh}
        >
            <StyledFaSyncAlt />
        </Button>
    );

    render() {
        const { company, loading, folderContent, fileContent } = this.props;
        const { currFolder, openedFile } = this.state;
        let content;

        if(loading){
            content = <Loading />;
        } else if(openedFile) {
            content = (
                <FileEditor 
                    content={fileContent} 
                    path={openedFile}
                    onBack={this.handleBackFile}
                    onSave={this.handleSaveFile}
                />
            );
        } else {
            content = (
                <FolderNavigator 
                    path={currFolder}
                    content={folderContent}
                    onChangeFolder={this.handleChangeDir}
                    onOpenFile={this.handleOpenFile}
                    onNewFile={this.handleNewFile}
                    onNewFolder={this.handleNewFolder}
                    onPublishZip={this.handlePublishZip}
                    onDelete={this.handleDelete}
                    onDownloadZip={this.handleDownloadZip}
                />
            );
        }

        return (
            <Page 
                company={company}
                leftContentHeader={this.renderRefresh()}
            >
                {content}
            </Page>
        );
    }
}

//passa o state do redux para props
const mapStateToProps = (state) => ({
    company: state.websocket.name,
    folderContent: state.filezilla.folderContent,
    fileContent: state.filezilla.fileContent,
    loading: state.filezilla.loading
});

//passa o disparo das ações para props 
const mapDispatchToProps = {
    startListDir,
    startGetFile,
    setFileContent,
    startPublishFile,
    startRefresh,
    startPublishZip,
    startCreateDir,
    startDelete
};

export default connect(mapStateToProps,mapDispatchToProps)(Filezilla);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loading } from '../../components';
import Page from '../../templates/Page';
import FolderNavigator from './FolderNavigator';
import FileEditor from './FileEditor';
import { startListDir, startGetFile, setFileContent, startPublishFile } from '../../actions/filezilla';

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
                />
            );
        }

        return (
            <Page company={company}>
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
    startPublishFile
};

export default connect(mapStateToProps,mapDispatchToProps)(Filezilla);
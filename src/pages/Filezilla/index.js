import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loading } from '../../components';
import Page from '../../templates/Page';
import FolderNavigator from './FolderNavigator';
import FileEditor from './FileEditor';
import { startListDir, startGetFile, setFileContent } from '../../actions/filezilla';

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

    render() {
        const { company, loading, folderContent, fileContent } = this.props;
        const { currFolder, openedFile } = this.state;
        let content;

        if(loading){
            content = <Loading />;
        } else if(fileContent) {
            content = (
                <FileEditor 
                    content={fileContent} 
                    path={openedFile}
                    onBack={this.handleBackFile}
                />
            );
        } else {
            content = (
                <FolderNavigator 
                    path={currFolder}
                    content={folderContent}
                    onChangeFolder={this.handleChangeDir}
                    onOpenFile={this.handleOpenFile}
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
    setFileContent
};

export default connect(mapStateToProps,mapDispatchToProps)(Filezilla);
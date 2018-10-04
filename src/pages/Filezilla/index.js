import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loading } from '../../components';
import Page from '../../templates/Page';
import FolderNavigator from './FolderNavigator';
import { startListDir } from '../../actions/filezilla';

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

    render() {
        const { company, loading, folderContent } = this.props;

        if(loading){
            return (
                <Page company={company}>
                    <Loading />
                </Page>
            );
        }

        return (
            <Page company={company}>
                <FolderNavigator 
                    path={this.state.currFolder}
                    content={folderContent}
                    onChangeFolder={this.handleChangeDir}
                />
            </Page>
        );
    }
}

//passa o state do redux para props
const mapStateToProps = (state) => ({
    company: state.websocket.name,
    folderContent: state.filezilla.folderContent,
    loading: state.filezilla.loading
});

//passa o disparo das ações para props 
const mapDispatchToProps = {
    startListDir
};

export default connect(mapStateToProps,mapDispatchToProps)(Filezilla);
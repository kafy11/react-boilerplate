//define o estado de loading
export const setLoading = () => ({
    type: 'SET_LOADING_FZ'
});

//define o conteúdo da pasta
export const setFolderContent = (folderContent) => {
    folderContent = folderContent.map((item) => {
        const name = item.split('/').pop();

        return {
            name,
            isFolder: (name.indexOf('.') == -1)
        };
    }).sort((a, b) => {
        if(a.isFolder && !b.isFolder) {
            return -1;
        }
        if(!a.isFolder && b.isFolder) {
            return 1;
        }
        return 0;
    });

    return {
        type: 'SET_FOLDER_CONTENT',
        folderContent
    };
};

//dispara a ação de listar a pasta
/* params:
    directory - caminho da pasta
*/
export const startListDir = (directory) => {
    return (dispatch, getState) => {
        const { conn, id } = getState().websocket;

        conn.send({
            action: 'listdir',
            frontAction: 'listDir',
            to: id,
            directory
        });
        
        dispatch(setLoading());
    }
};

//define o conteúdo do arquivo
export const setFileContent = (fileContent) => ({
    type: 'SET_FILE_CONTENT',
    fileContent
});

//dispara a ação de pegar conteúdo do arquivo
/* params:
    directory - caminho da pasta
*/
export const startGetFile = (file) => {
    return (dispatch, getState) => {
        const { conn, id } = getState().websocket;

        conn.send({
            action: 'getfile',
            frontAction: 'getFile',
            to: id,
            file
        });
        
        dispatch(setLoading());
    }
};
//gerencia os eventos para a global da query
//NÃO PODE SOBRESCREVER OS PARÂMETROS
export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_LOADING_FZ':
            return {
                ...state,
                loading: true
            };

        case 'SET_FOLDER_CONTENT':
            return {
                ...state,
                loading: false,
                folderContent: action.folderContent
            };

        case 'SET_FILE_CONTENT':
            return {
                ...state,
                loading: false,
                fileContent: action.fileContent
            };

        default: 
            return state;
    }
};
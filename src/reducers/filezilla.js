//gerencia os eventos para a global da query
//NÃO PODE SOBRESCREVER OS PARÂMETROS
export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_LOADING_FZ':
            return {
                loading: true
            };

        case 'SET_FOLDER_CONTENT':
            return {
                folderContent: action.folderContent
            };

        default: 
            return state;
    }
};
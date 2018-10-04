//gerencia os eventos para a global da query
//NÃO PODE SOBRESCREVER OS PARÂMETROS
export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_DATA_QUERY':
            return {
                ...state,
                data: action.data,
                running: false
            };

        case 'SET_RUNNING_QUERY':
            return {
                ...state,
                data: undefined,
                running: true
            };

        case 'SET_DATA_OBJ':
            return {
                ...state,
                data_obj: action.data,
                running_obj: false
            };

        case 'SET_RUNNING_LIST_OBJ':
            return {
                ...state,
                data_obj: undefined,
                running_obj: true
            };

        case 'SET_DATA_GET_DDL':
            return {
                ...state,
                data_ddl: action.data,
                running_ddl: false
            };

        case 'SET_RUNNING_GET_DDL':
            return {
                ...state,
                data_ddl: undefined,
                running_ddl: true
            };

        default: 
            return state;
    }
};
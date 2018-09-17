//gerencia os eventos para a global do websocket
//NÃO PODE SOBRESCREVER OS PARÂMETROS
export default (state = {}, action) => {
    switch (action.type) {
        case 'CONNECT_SERVER':
            return {
                conn: action.conn
            };

        case 'SET_COMPANIES_LIST':
            return {
                ...state,
                companies: action.companies
            };

        case 'CONNECT_COMPANY':
            return {
                ...state,
                id: action.id,
                name: action.name
            };

        case 'SET_ERROR':
            return {
                ...state,
                error: action.error
            };
            
        default: 
            return state;
    }
};
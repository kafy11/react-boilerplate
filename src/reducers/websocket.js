export default (state = {}, action) => {
    switch (action.type) {
        case 'CONNECT_SERVER':
            return {
                conn: action.conn
            };
        case 'CONNECT_COMPANY':
            return {
                ...state,
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
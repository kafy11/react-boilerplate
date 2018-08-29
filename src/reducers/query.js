export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                data: action.data
            };
        case 'SET_RUNNING':
            return {
                running: true
            };
        default: 
            return state;
    }
};
export const setRunning = () => ({
    type: 'SET_RUNNING'
});

export const startSelect = (query) => {
    return (dispatch, getState) => {
        const conn = getState().websocket.conn;

        conn.send({
            action: 'select',
            query
        });
        
        dispatch(setRunning());
    }
};

export const startQuery = (query) => {
    return (dispatch, getState) => {
        const conn = getState().websocket.conn;

        conn.send({
            action: 'runquery',
            query
        });

        dispatch(setRunning());
    }
};

export const setData = (data) => ({
    type: 'SET_DATA',
    data
});
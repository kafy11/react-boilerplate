export const setRunning = () => ({
    type: 'SET_RUNNING'
});

export const setRunningListObj = () => ({
    type: 'SET_RUNNING_LIST_OBJ'
});

export const setRunningGetDDL = () => ({
    type: 'SET_RUNNING_GET_DDL'
});

export const startSelect = (query) => {
    return (dispatch, getState) => {
        const conn = getState().websocket.conn;

        conn.send({
            action: 'select',
            frontAction: 'select',
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
            frontAction: 'query',
            query
        });

        dispatch(setRunning());
    }
};

export const startListObjects = (type) => {
    return (dispatch, getState) => {
        const conn = getState().websocket.conn;

        const query = (type != 'PROCOBJ') ? `SELECT OBJECT_NAME FROM user_objects WHERE object_type = '${type}' ORDER BY OBJECT_NAME` 
                                    : "SELECT JOB_NAME AS OBJECT_NAME FROM user_scheduler_jobs ORDER BY OBJECT_NAME";

        conn.send({
            action: 'select',
            frontAction: 'listObjects',
            query
        });

        dispatch(setRunningListObj());
    }
};

export const startGetDDL = (type, object) => {
    return (dispatch, getState) => {
        const conn = getState().websocket.conn;
        const query = `SELECT DBMS_METADATA.GET_DDL('${type}','${object}') as DDL FROM DUAL`;

        conn.send({
            action: 'select',
            frontAction: 'getDDL',
            query
        });

        dispatch(setRunningGetDDL());
    }
};

export const setData = (data) => ({
    type: 'SET_DATA',
    data
});

export const setDataObj = (data) => ({
    type: 'SET_DATA_OBJ',
    data
});

export const setDataGetDDL = (data) => ({
    type: 'SET_DATA_GET_DDL',
    data
});
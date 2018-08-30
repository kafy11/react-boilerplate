export const connectServer = (conn) => ({
    type: 'CONNECT_SERVER',
    conn
});

export const startConnectCompany = () => {
    return (dispatch, getState) => {
        const conn = getState().websocket.conn;

        conn.send({
            action: 'getname',
            frontAction: 'connectCompany'
        });
    }
};

export const connectCompany = (companyName) => ({
    type: 'CONNECT_COMPANY',
    name: companyName
});

export const setError = (error) => ({
    type: 'SET_ERROR',
    error
});
// ações do reducer websocket

//define a global da conexão
export const connectServer = (conn) => ({
    type: 'CONNECT_SERVER',
    conn
});

//dispara a ação no websocket de conectar na empresa
export const startConnectCompany = () => {
    return (dispatch, getState) => {
        const conn = getState().websocket.conn;

        conn.send({
            action: 'getname',
            frontAction: 'connectCompany'
        });
    }
};

//define a global do nome da empresa
export const connectCompany = (companyName) => ({
    type: 'CONNECT_COMPANY',
    name: companyName
});

//define a global de erro
export const setError = (error) => ({
    type: 'SET_ERROR',
    error
});
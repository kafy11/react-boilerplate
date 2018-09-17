// ações do reducer websocket

//define a global da conexão
export const connectServer = (conn) => ({
    type: 'CONNECT_SERVER',
    conn
});

//dispara a ação no websocket de conectar na empresa
export const startConnectCompany = (id) => {
    return (dispatch, getState) => {
        const conn = getState().websocket.conn;

        conn.send({
            action: 'getname',
            frontAction: 'connectCompany',
            to: id
        });
    }
};

//dispara a ação no websocket de listar empresas conectadas
export const startListCompanies = () => {
    return (dispatch, getState) => {
        const conn = getState().websocket.conn;

        conn.send({
            action: 'listCompanies',
            frontAction: 'listCompanies'
        });
    }
};

//define a global de lista de empresas
export const listCompanies = (companies) => ({
    type: 'SET_COMPANIES_LIST',
    companies
});

//define a global do nome da empresa
export const connectCompany = (id, name) => ({
    type: 'CONNECT_COMPANY',
    id, 
    name
});
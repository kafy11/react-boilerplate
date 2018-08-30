// ações do reducer query 

//define o estado de executando query
export const setRunning = () => ({
    type: 'SET_RUNNING'
});

//define o estado de carregando lista de objeto
export const setRunningListObj = () => ({
    type: 'SET_RUNNING_LIST_OBJ'
});

//define o estado de carrengado ddl
export const setRunningGetDDL = () => ({
    type: 'SET_RUNNING_GET_DDL'
});

//dispara a ação de select no websocket e ativa o loading
/* params:
    query - select a ser executado
*/
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

//dispara a ação de runquery no websocket e ativa o loading
/* params: 
    query - query a ser executada
*/
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

//dispara a ação de select para pegar uma lista de objetos e ativa o loading da lista de objetos
/* params:
    type - string do tipo de objeto em maiúscula
*/
export const startListObjects = (type) => {
    return (dispatch, getState) => {
        const conn = getState().websocket.conn;

        //o select para jobs é diferente
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

//dispara a ação de select para pegar o ddl do objeto e ativa o loading de carregar o ddl
/* params:
    type - string do tipo de objeto em maiúsculo
    object - nome do objeto em maiúsculo
*/
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

//atualiza os dados globais do resultado da query
/* params:
    data - dados do resultado
*/
export const setData = (data) => ({
    type: 'SET_DATA',
    data
});

//atualiza os dados globais da lista de objetos
/* params: 
    data - dados da lista de objetos
*/
export const setDataObj = (data) => ({
    type: 'SET_DATA_OBJ',
    data
});

//atualiza os dados globais do ddl aberto
/* params:
    data - dados do ddl aberto
*/
export const setDataGetDDL = (data) => ({
    type: 'SET_DATA_GET_DDL',
    data
});
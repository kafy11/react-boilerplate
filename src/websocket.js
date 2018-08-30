import { connectServer, startConnectCompany, connectCompany, setError } from './actions/websocket';
import { setData, setDataObj, setDataGetDDL } from './actions/query';

//função que pega um parâmetro do get da url
const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//função que inicializa o websocket
/* params:
    store - store do redux para conseguir disparar ações que mudam o estado global da app
*/
export default async (store) => {
    //pega o id da empresa destino no get da url
    const to = getParameterByName('id');
    
    if(to) 
    {
        //cria o objeto da conexão websocket
        const conn = await new WebSocket('ws://54.235.35.176:8080?id=0');
        
        //quando a conexão é aberta, tenta conectar na empresa
        conn.onopen = function(e) {
            store.dispatch(startConnectCompany());
        };

        //evento de quando recebe mensagem
        conn.onmessage = function(e) {
            //converte a mensagem para json
            const data = JSON.parse(e.data);

            if(data.toAction) {
                switch(data.frontAction) {
                    //resposta da ação disparada na websocket.startConnectCompany
                    case 'connectCompany':
                        store.dispatch(connectCompany(data.response));
                        break;
                    
                    //resposta da ação disparada na query.startSelect ou query.startQuery 
                    case 'select':
                    case 'query':
                        store.dispatch(setData(data.response));
                        break;

                    //resposta da ação disparada na query.startListObj
                    case 'listObjects':
                        store.dispatch(setDataObj(data.response));
                        break;

                    //resposta da ação disparada na query.startGetDDL
                    case 'getDDL':
                        store.dispatch(setDataGetDDL(data.response[0]['DDL']));
                        break;
                }
            } else if(data.status == -1) {
                store.dispatch(setError(data.response));
            }
        };

        //tenta conectar com o servidor
        store.dispatch(connectServer({
            send: (data) => conn.send(JSON.stringify({
                ...data,
                to
            }))
        }));
    }
    else
    {
        store.dispatch(setError('Nenhuma empresa informada na url'));
    }
}
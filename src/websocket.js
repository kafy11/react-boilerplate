import { connectServer, connectCompany, startListCompanies, listCompanies } from './actions/websocket';
import { setData, setDataObj, setDataGetDDL } from './actions/query';
import { setFolderContent } from './actions/filezilla';
import { history } from './routers';

//função que inicializa o websocket
/* params:
    store - store do redux para conseguir disparar ações que mudam o estado global da app
*/
export default async (store) => {
    //cria o objeto da conexão websocketd
    const conn = await new WebSocket('ws://gate.gthealth.com.br:8080?id=0');

    //quando abrir a conexão
    conn.onopen = () => {
        //cria a conexão do server no state do redux
        store.dispatch(connectServer({
            send: (data) => conn.send(JSON.stringify({
                ...data
            })) 
        }));

        //dispara a ação de listar empresas
        store.dispatch(startListCompanies());
    }

    //evento de quando recebe mensagem
    conn.onmessage = function(e) {
        //converte a mensagem para json
        const data = JSON.parse(e.data);

        if(data.toAction) {
            switch(data.frontAction) {
                case 'listCompanies':
                    store.dispatch(listCompanies(data.response));
                    break;

                //resposta da ação disparada na websocket.startConnectCompany
                case 'connectCompany':
                    store.dispatch(connectCompany(data.from,data.response));
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

                //resposta da ação disparada no filezilla.startListDir
                case 'listDir':
                    store.dispatch(setFolderContent(data.response));
                    break;
            }
        } else if(data.status == -1) {
            history.push({
               pathname: '/error', 
               state: {
                   message: data.response
               } 
            });
        }
    };
}
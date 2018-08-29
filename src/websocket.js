import { connectServer, startConnectCompany, connectCompany, setError } from './actions/websocket';
import { setData } from './actions/query';

const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default async (store) => {
    const to = getParameterByName('id');
    
    if(to) 
    {
        const conn = await new WebSocket('ws://54.235.35.176:8080?id=0');
        conn.onopen = function(e) {
            store.dispatch(startConnectCompany());
        };

        conn.onmessage = function(e) {
            const data = JSON.parse(e.data);

            if(data.toAction) {
                switch(data.toAction) {
                    case 'getname':
                        store.dispatch(connectCompany(data.response));
                        break;
                    
                    case 'select':
                    case 'runquery':
                        store.dispatch(setData(data.response));
                        break;
                }
            } else if(data.status == -1) {
                store.dispatch(setError(data.response));
            }
        };

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
import React from 'react';
import styled from 'styled-components';
import { Table, Loading } from '../../components';
import theme from '../../themes';

//Container da página
const PageContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.light};
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.small}px;
`;

/* props:
    data - dados do resultado
    running - mostra o loading
*/
export default ({ data, running }) => {
    let content;

    //mostra o loading
    if(running) {
        return <Loading />;
    }

    //se os dados estiverem vazio
    if(!data || data.length == 0) {
        content = 'Nenhum resultado!';
    } else if(typeof(data) == 'string') { //se for uma string
        content = data;
    } else if(data === true){ //se for o booleano true
        content = "Query executada";
    } else {
        content = <Table data={data} />;
    }

    return (
        <PageContainer>
            {content}
        </PageContainer>
    );
}
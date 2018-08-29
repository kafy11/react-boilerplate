import React from 'react';
import { Table } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';

export default ({ data }) => {
    const renderTableHeader = (data) => {
        return Object.keys(data[0]).map((column,i) => (
            <th key={i}>{column}</th>
        ));
    }

    const renderTableBody = (data) => {
        return data.map((row,i) => (
            <tr key={i}>
                {Object.keys(row).map((column,j) => (
                    <td key={j}>{row[column]}</td>
                ))}
            </tr>
        ));
    }

    return (
        <Scrollbars>
            <Table>
                <thead>
                    <tr>
                        {renderTableHeader(data)}
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody(data)}
                </tbody>
            </Table>
        </Scrollbars>
    );
}
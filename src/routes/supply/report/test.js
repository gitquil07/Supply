import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client';
import { GET_TABLE_BODY } from "./gql"

const TestTable = () => {
    const [getTableData, tableData] = useLazyQuery(GET_TABLE_BODY);
    const body = tableData?.data?.report?.generalReport?.data?.body || [];
    const columns = tableData?.data?.report?.generalReport?.data?.columns || [];

    useEffect(() => {
        getTableData();
    }, []);

    return (
        <ReportTable border="1px" columns={columns} tableData={body} >
            {/* <TableHeader columns={columns} />
            <TableBody tableData={body} /> */}
        </ReportTable>
    )
}


const ReportTable = ({columns, tableData}) => {

    let flags = [];
    return(
        <Table>
            <thead>
                    {
                        columns.map((row, idx) => {
                        if(idx == 0){
                            let pos = 0;
                            return (
                                <tr>
                                    {
                                        row.map((col, colIdx) => {
                                            const rep =  pos == 0? row.filter(r => r == col).length - 1 : row.filter(r => r == col).length;
                                            if(colIdx == rep + pos){
                                                const res = <td colspan={pos == 0? rep + 2 : rep} className="first">{col}</td>
                                                flags.push(rep + pos+1);
                                                pos = pos + rep;
                                                return res;
                                            }         
                                        })
                                    }
                                </tr>
                            )
                        }
                        if(idx == 1){
                            return (
                                <tr>
                                    <td rowspan="2">№</td>
                                    {
                                        row.map((col, colIdx) => {
                                            if(row.indexOf(columns[idx+1][colIdx]) != -1){
                                                return <td rowspan={2} className={flags.indexOf(colIdx) > -1? "first" : ""}>{col}</td>
                                            }else{
                                                return <td className={flags.indexOf(colIdx) > -1? "first" : ""}>{col}</td>
                                            }
                                        })
                                    }
                                </tr>
                            );
                        }
                        if(idx == 2){
                            return <tr>
                                {
                                    row.map((col, colIdx) => {
                                        if(row.indexOf(columns[idx-1][colIdx]) == -1){
                                            return <td className={flags.indexOf(colIdx) > -1? "first" : ""}>{col}</td>
                                        }
                                    })
                                }
                            </tr>
                        }
                        })
                    }
            </thead>
            <tbody>
                {
                    tableData.map((row, rowIdx) => {
                        return <tr>
                            <td>{rowIdx+1}</td>
                            {
                                row.map((col, colIdx)=> {
                                    if(flags.indexOf(colIdx + 1) > -1){
                                        return <td className="last">{col}</td>    
                                    }
                                    else if(flags.indexOf(colIdx) > -1){
                                        return <td className="first">{col}</td>
                                    }
                                    else{
                                        return <td>{col}</td>
                                    }
                                })
                            }
                        </tr>
                    })
                }
            </tbody>
        </Table>
    );

}

// const TableBody = ({tableData}) => {

//     return(
//         <tbody>
//             {
//                 tableData.map((row, colIdx) => {
//                     return <tr>
//                         <td>{colIdx+1}</td>
//                         {
//                             row.map(col => {
//                                 return <td>{col}</td>    
//                             })
//                         }
//                     </tr>
//                 })
//             }
//         </tbody>
//     );

// }

export default TestTable;

const Table = styled.table`
    width: 100%;
    height: calc(100vh - 90px);
    font-family: arial, sans-serif;
    border-collapse: collapse;
    overflow-x: scroll;
    overflow: auto;  
    display: block;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.30);

    .last {
        ::after {
            content: none;
        }
    }

    .first {
        overflow: hidden;

        ::before {
            content: ""; 
            position: absolute;
            left: -15px;
            top: 0;
            width: 1px;
            height: 100%;
            z-index: 99999999; 
            box-shadow: 22px 0px 34px 8px rgba(0,0,0,0.76);
            -webkit-box-shadow: 22px 0px 34px 8px rgba(0,0,0,0.76);
            -moz-box-shadow: 22px 0px 34px 8px rgba(0,0,0,0.76);
        }
    }


    ::-webkit-scrollbar {
        height: 12px !important;
        width: 12px !important; 
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }

    ::-webkit-scrollbar-thumb {
        background: #5762B2; 
    }

    .last-col {
        border-right: none;
    }

    thead{
        width: 100%;
        white-space: nowrap;
    
        tr:first-child td{
            color: #fff;
            font-size:24px;
            padding: 12px 0;  
            border-right: none;
            background:rgba(74,77,99,1);
        }

        tr {
            td {
                background: #5762B2;
                color: #fff;
                padding: 20px; 
                border-right: 1px solid #000000;
                border-bottom: 1px solid #000000;
                text-align:center;
                position: relative;
                font-size: 14px; 
                font-family: "Roboto", sans-serif;
            }

            .badge {
                background: #08BB19;
                font-size:18px;
                border-radius: 5px;
                padding: 5px;
                margin-left: 10px;
            }
        }
    }

    tbody{
        width: 100%;
        white-space: nowrap; 

        tr { 
            td {
                padding: 15px;
                text-align: center; 
                position: relative;
                font-family: "Roboto", sans-serif;
                font-size: 14px;

                :after {
                    content: '';
                    height: 80%;
                    width: 1px;
                    position: absolute;
                    right: 0;
                    top: 10%;
                    background-color: #999999; 
                }

                :first-child {
                    color: #fff;
                    background-color: #5762B2;
                    border-right: 1px solid #000000;

                    ::after {
                        content: none;
                    }
                }

                :last-child {
                    ::after {
                        content: none;
                    }
                }
            }

            .white {
                background: #FFFFFF;
            } 

            .red {
                    background: #FFD0D0;
            }

            .yellow {
                    background: #FAFFC3;
            } 

            :nth-child(even) {
                .red, .white, .yellow {
                    box-shadow: inset -300px 0px 0px rgba(0, 0, 0, 0.15);
                }
            }
        }
    }

`;
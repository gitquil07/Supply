import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client';
import { GET_TABLE_BODY } from "./gql"
import { findValue, goToNewLine } from 'utils/functions'

const ReportTable = () => {
    const [getTableData, tableData] = useLazyQuery(GET_TABLE_BODY);
    const body = tableData?.data?.report?.generalReport?.data?.body || [];
    const columns = tableData?.data?.report?.generalReport?.data?.columns || [];

    useEffect(() => {
        getTableData();
    }, []);

    return (
        <Wrapper>
           
            <h2>sdasdasdasdasd</h2>
            <Table>
                <TableHeader columns={columns} />
                <TableBody tableData={body} />
            </Table>
        </Wrapper >
    )
}

const WithBadge = (str) => {

    const endIndex = str.indexOf("закупке") > -1 ? str.indexOf("закупке") + "закупке".length : str.indexOf("прогноз") > -1 ? str.indexOf("прогноз") + "прогноз".length : 0,
        desc = str.slice(0, endIndex),
        date = str.slice(endIndex);

    return (
        <>
            {desc}<span className="badge">{date}</span>
        </>
    )
}

const TableHeader = ({ columns }) => {
    return (
        <CustomThead>
            {
                columns.map((colRows, idx) => {
                    if (idx === 0) {
                        return <tr>

                            <td colspan="2">Завод</td>
                            {
                                colRows.map((colName, colIdx) => {
                                    if (colIdx === 3) {
                                        return <td colspan="3" className="first">{colName}</td>
                                    }
                                    if (colIdx === 13) {
                                        return <td colspan="10" className="first">{WithBadge(colName)}</td>
                                    }
                                    if (colIdx === 24) {
                                        return <td colspan="11" className="first">{colName}</td>
                                    }
                                    if (colIdx === 28) {
                                        return <td colspan="4" className="first">{WithBadge(colName)}</td>
                                    }
                                    if (colIdx === 32) {
                                        return <td colspan="4" className="first">{WithBadge(colName)}</td>
                                    }
                                    if (colIdx === 36) {
                                        return <td colspan="4" className="first">{WithBadge(colName)}</td>
                                    }
                                })
                            }
                        </tr>
                    }

                    if (idx === 1) {
                        return <tr>
                            <td rowspan="2">№</td>
                            {
                                colRows.map((colName, colIdx) => {
                                    if (colIdx == 1 || colIdx == 4 || colIdx == 25 || colIdx == 29 || colIdx == 33) {
                                        return <td rowspan={2} className="first">{colName}</td>
                                    }
                                    if (colIdx != 14) {
                                        return <td rowspan={2}>{goToNewLine(colName)}</td>
                                    } else {
                                        return <td className="first">{goToNewLine(colName)}</td>
                                    }
                                })
                            }
                        </tr>
                    }
                    if (idx === 2) {
                        return <tr>
                            {
                                colRows.map((colName, colIdx) => {
                                    if (colIdx === 14) {
                                        return <td className="withShadow">{colName}</td>
                                    }
                                })
                            }
                        </tr>
                    }
                })
            }
        </CustomThead>
    );
}

const TableBody = ({ tableData }) => {
    return (
        <CustomBody>
            {
                tableData.map((element, index) => {
                    return (
                        <tr>
                            <td className="white">{index + 1}</td>
                            <td className="white last">{findValue(element, 0)}</td>

                            <td className="white first">{findValue(element, 1)}</td>
                            <td className="white">{findValue(element, 2)}</td>
                            <td className="white last">{findValue(element, 3)}</td>

                            <td className="red first">{findValue(element, 4)}</td>
                            <td className="red">{findValue(element, 5)}</td>
                            <td className="red">{findValue(element, 6)}</td>
                            <td className="red">{findValue(element, 7)}</td>
                            <td className="red">{findValue(element, 8)}</td>
                            <td className="yellow">{findValue(element, 9)}</td>
                            <td className="yellow">{findValue(element, 10)}</td>
                            <td className="yellow">{findValue(element, 11)}</td>
                            <td className="yellow">{findValue(element, 12)}</td>
                            <td className="yellow last">{findValue(element, 13)}</td>

                            <td className="white first">{findValue(element, 14)}</td>
                            <td className="white">{findValue(element, 15)}</td>
                            <td className="white">{findValue(element, 16)}</td>
                            <td className="white">{findValue(element, 17)}</td>
                            <td className="white">{findValue(element, 18)}</td>
                            <td className="white">{findValue(element, 19)}</td>
                            <td className="white">{findValue(element, 20)}</td>
                            <td className="white">{findValue(element, 21)}</td>
                            <td className="white">{findValue(element, 22)}</td>
                            <td className="white">{findValue(element, 23)}</td>
                            <td className="white last">{findValue(element, 24)}</td>

                            <td className="red first">{findValue(element, 25)}</td>
                            <td className="yellow">{findValue(element, 26)}</td>
                            <td className="yellow">{findValue(element, 27)}</td>
                            <td className="red last">{findValue(element, 28)}</td>

                            <td className="red first">{findValue(element, 29)}</td>
                            <td className="yellow">{findValue(element, 30)}</td>
                            <td className="yellow">{findValue(element, 31)}</td>
                            <td className="red last">{findValue(element, 32)}</td>

                            <td className="red first">{findValue(element, 33)}</td>
                            <td className="yellow">{findValue(element, 34)}</td>
                            <td className="yellow">{findValue(element, 35)}</td>
                            <td className="red">{findValue(element, 36)}</td>
                        </tr>
                    )
                })
            }
        </CustomBody>
    );
}

const CustomThead = styled.thead`
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
`;

const CustomBody = styled.tbody`
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
`;


export default ReportTable

const Wrapper = styled.div`
    .fullscreen {
        position: absolute;
        top: 0;
    }
`

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
`
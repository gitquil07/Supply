import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useLazyQuery } from '@apollo/client';
import { GET_TABLE_BODY } from "./gql";
import { generalReportColorSchema } from "utils/static";
import { goToNewLine } from "utils/functions";
import { useTitle } from "hooks";

const TestTable = () => {
    const [getTableData, tableData] = useLazyQuery(GET_TABLE_BODY);
    const body = tableData?.data?.report?.generalReport?.data?.body || [];
    const columns = tableData?.data?.report?.generalReport?.data?.columns || [];
    const title = useTitle("Отчёт");

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

const WithBadge = (str) => {

    const endIndex = str.indexOf("закупке") > -1?  str.indexOf("закупке") + "закупке".length : str.indexOf("прогноз") > -1?  str.indexOf("прогноз") + "прогноз".length : undefined, 
          desc = endIndex? str.slice(0, endIndex) : str,
          date = endIndex && str.slice(endIndex);

    return (
        <>
            {desc} {date && <span className="badge">{date}</span>}
        </>
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
                                                const res = <td colspan={pos == 0? rep + 2 : rep} className="first">{WithBadge(col)}</td>
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
                                            let cageClasses = "";

                                            if(flags.indexOf(colIdx + 1) > -1){
                                                cageClasses += " lastHead";
                                            }
                                            if(flags.indexOf(colIdx) > -1){
                                                cageClasses += " first";
                                            }

                                            if(row.indexOf(columns[idx+1][colIdx]) != -1){   
                                                return <td rowspan={2} className={cageClasses}>{col}</td>
                                            }else{
                                                return <td className={cageClasses}>{col}</td>
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
                                            let cageClasses = "";

                                            if(flags.indexOf(colIdx + 1) > -1){
                                                cageClasses += " lastHead";
                                            }
                                            if(flags.indexOf(colIdx) > -1){
                                                cageClasses += " first";
                                            }
                                            return <td className={cageClasses}>{col}</td>
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
                            <td className="blue">{rowIdx+1}</td>
                            {
                                row.map((col, colIdx)=> {
                                    
                                    let cageClasses = "";
                                    const columnName = columns[0][colIdx],
                                          schemaColNames =  Object.keys(generalReportColorSchema);

                                          let has = false;
                                          for(let name of schemaColNames){
                                              if((columnName.indexOf(name) > -1) || (columnName.indexOf(name) == -1 && name == "Дата")){
                                                has = name
                                              }
                                          }
                                          

                                          if(has){
                                              let columnScheme = generalReportColorSchema[has],
                                              schemeType = Object.getOwnPropertyNames(columnScheme)[0];
                            
                                                    switch(schemeType){
                                                        case "single":
                                                            cageClasses += columnScheme[schemeType].colorClass;
                                                        break;
                                                        case "combination":
                                                            let colorClasses = columnScheme[schemeType].colorClasses.split(" "),
                                                                start = columns[0].indexOf(columnName),
                                                                colReps = columns[0].filter(col => col == columnName).length,
                                                                end = start + colReps;

                                                                
                                                                if(columnScheme[schemeType].type == "simple-devision"){

                                                                let middle = Math.floor(start + end) / 2;

                                                                
                                                                if(colIdx >= start && colIdx <= middle){
                                                                    cageClasses += colorClasses[0];
                                                                }
                                                                
                                                                if(colIdx > middle && colIdx <= end){
                                                                    cageClasses += colorClasses[1];                                                                    
                                                                }
                                                                
                                                                
                                                            }else if(columnScheme[schemeType].type == "outline"){
                                                                
                                                                if(colIdx == end-1 || colIdx == start){
                                                                    cageClasses += colorClasses[1];
                                                                }
                                                                
                                                                if(colIdx > start && colIdx < end-1 ){
                                                                    cageClasses += colorClasses[0];
                                                                }
                                                                
                                                            }
                                                        break;
                                                    }     
                                            }
                                                    
                                        // debugger;
                                        if(flags.indexOf(colIdx + 1) > -1){
                                            cageClasses += " last";
                                        }
                                        if(flags.indexOf(colIdx) > -1){
                                            cageClasses += " first";
                                        }

                                        return <td className={cageClasses}>{goToNewLine(col)}</td>
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

    .lastHead{
        border-right:none;
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
                .red, .white, .yellow, .blue {
                    box-shadow: inset -5000px 0px 0px rgba(0, 0, 0, 0.15);
                }
            }
        }
    }

`;
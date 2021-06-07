import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_TABLE_BODY } from "./gql";
import { getValueOfProperty } from "utils/functions";
import styled from "styled-components"; 
import { generalReportColorSchema } from "utils/static";
import { goToNewLine } from "utils/functions";
import { useTitle } from "hooks"
import Helmet from "react-helmet";
import { Loading } from "components/LoadingIndicator";

const allowedHeadersToRepeat = [ 
    "Остаток на начало\nмесяца ",
    "Приход на месяц\n",
    "Расход на месяц\n",
    "Остаток на конец\nмесяца",
    "Хватает, дней"
];


const shallowCheckingForExisting = (val, arr) => {
    let contains = false;

    for(let value of arr){

        if(value.indexOf(val) > -1) contains = true;
    
    }

    return contains;
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

const BlurBackground = ({children}) => {
    return (
        <BluredBg className="fade">
            {children}
        </BluredBg>
    );
}

const TestTable2 = () => {

    const title = useTitle("Отчёт");

    const [getReport, reportRes] = useLazyQuery(GET_TABLE_BODY),
          tableData = getValueOfProperty(reportRes?.data, "body") || [],
          columns = getValueOfProperty(reportRes?.data, "columns") || [];

    const { loading } = reportRes;
    // const loading = true;

    useEffect(() => {
        getReport();
    }, []);

    let renderedValues = [];
    let repeatedRenderedValues = [];
    let repeatedColsAmount = columns[0]? columns[0].filter(column => column.indexOf("Планируемый прогноз") > -1).length / 4: 0;
    let flags = [];
    return(
        <>
        <Helmet title={title} />
            <Table border="1px">
                {
                        loading && <BlurBackground>
                            <Loading fs="100" />
                        </BlurBackground>
                }
                <thead>
                    {
                        columns.map((row, rowIdx) => {
                            let pos = 0;
                            return <tr key={rowIdx}>
                                {
                                    rowIdx == 1? <td rowspan={columns.length-1}>№</td> : null
                                }
                                {
                                    row.map((col, colIdx) => {
                                        const colspan = row.filter(value => value == col).length;
                                            if(rowIdx == 0){
                                                let reps = colspan - 1;
                                                if(colIdx == pos + reps){
                                                    pos += reps + 1;
                                                    flags.push(pos);
                                                }
                                            }
                                            let duplicatesInRows = 0;
                                            for(let i = 0; i < columns.length; i++){
                                                if(columns[i][colIdx] == col){
                                                    duplicatesInRows++;
                                                }
                                            }              
                                            
                                        const rowspan = duplicatesInRows;
                                        
                                        let cageClasses = "";
                                        if(flags.indexOf(colIdx + 1) > -1){
                                            cageClasses = "last" 
                                        }else if (flags.indexOf(colIdx) > -1){
                                            cageClasses = "first";
                                        }

                                        if(renderedValues.indexOf(col) == -1 || (renderedValues.indexOf(col) > -1 && shallowCheckingForExisting(col, allowedHeadersToRepeat))){
                                            renderedValues.push(col);
                                            let attrs = {
                                                key: colIdx,
                                                className: cageClasses,
                                                rowspan
                                            }
                                            if(shallowCheckingForExisting(col, allowedHeadersToRepeat) && (repeatedRenderedValues.filter(v => v.indexOf(col) > -1).length < repeatedColsAmount)){
                                                repeatedRenderedValues.push(col);
                                                if(rowIdx == 2 && col == "Хватает, дней"){
                                                    return null;
                                                }else{
                                                    return <td {...attrs} >{WithBadge(col)}</td>
                                                }
                                            }
                                            if(!shallowCheckingForExisting(col, allowedHeadersToRepeat)){
                                                let isFirst = !!(rowIdx == 0 && colIdx == 0);
                                                attrs.colspan = isFirst? colspan + 1 : colspan;
                                                return <td {...attrs} colspan={isFirst? colspan + 1 : colspan}>{WithBadge(col)}</td>
                                            }
                                        }

                                    })
                                }
                            </tr>
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
                                                        
                                            // console.log("cageClasses", cageClasses);
                                            // debugger;
                                            if(flags.indexOf(colIdx + 1) > -1){
                                                cageClasses += " last";
                                            }
                                            if(flags.indexOf(colIdx) > -1){
                                                cageClasses += " first";
                                            }

                                            if(+col < 0){
                                                console.log("cageClasses", col);
                                                cageClasses += " reddest";
                                            }

                                            // console.log("cage classes", cageClasses);
                                            return <td className={cageClasses}>{col}</td>
                                            // return <td className={cageClasses}>{col}</td>
                                    })
                                }
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </>
    );

}

export default TestTable2;

const BluredBg = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    position:absolute;
    top:0;
    left:0;
    opacity:1;

    background-color: rgba(0, 0, 0, 0.4);
    color:#fff;
    backdrop-filter: blur(10px);
    transition: opacity 1s linear;
    transition: display 1.1s linear;

    &.fade{
        animation-name: fade;
        animation-duration: .6s;
        animation-fill-mode: forwards;
    }

    @keyframes fade{
        0%{
            display:flex;
            opacity:1;
        }
        80%{
            opacity:0;
        }
        100%{
            display:none;
        }
    }
`;

const Table = styled.table`
    width: 100%;
    height: calc(100vh - 90px);
    font-family: arial, sans-serif;
    border-collapse: collapse;
    overflow-x: scroll;
    overflow: auto;  
    display: block;
    border-radius: 10px;
    position:relative;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.30);

    .reddest{
        background-color:red !important;
        color:#fff !important;
    }

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
import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import styled from "styled-components";

import SearchIcon from '@material-ui/icons/YoutubeSearchedFor';
import PrintIcon from '@material-ui/icons/Receipt';
import DownloadIcon from '@material-ui/icons/GetApp';
import ViewColumnIcon from '@material-ui/icons/DynamicFeed';
import FilterIcon from '@material-ui/icons/GroupWork';
import CircularProgress from "@material-ui/core/CircularProgress";


const Container = styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
`


export const CustomMUIDataTable = React.memo(({ count, title, data, columns, customRowOptions, searchableFields, loading, onDownload }) => {

    const [words, setWords] = useState("");

    const options = {
        filterType: 'dropdown',
        selectableRows: "none",
        rowsPerPage: count,
        ...customRowOptions,
        onSearchChange: searchText => {
            setWords(searchText)
        },
        textLabels: {
            body:{
                noMatch: loading? <Container><CircularProgress /></Container> : "Нет записей"
            }
        },
        onDownload: (typeof onDownload === "function")? onDownload : undefined
    };


    const components = {
        icons: {
            SearchIcon,
            PrintIcon,
            DownloadIcon,
            ViewColumnIcon,
            FilterIcon,
        }
    };

    const filterList = () => {

        if(words !== "" && words !== null){

            const res = data.filter(row => {
    
                const found = [];
                
                searchableFields.forEach(fieldName => {
                    const value = row[fieldName];
                    
    
                    if(value !== undefined){
    
                        if(typeof value === "object"){
                            
                            if(Array.isArray(value)){
                                // Case when object is (array)
                                
                                // Look at least one match in array.
                                // If found push (true) to (found) array!!
                                // if not found push (false)

                                const matches = [];
                                value.forEach(val => {
                                    matches.push(val.toLowerCase().indexOf(words.toLowerCase()) > -1);
                                });
                                
                                found.push(matches.indexOf(true) > -1);
    
                            }else if(value !== null){
                               
                                // Case when object is (object)
    
                                // Get object keys and go through 
                                // each value of this object if found 
                                // at least one match push true to (found)
                                // otherwise push (false)
    
                                const keys = Object.keys(value);
                                
                                const matchesRes = [];
    
                                keys.forEach(key => {
    
                                    const val = value[key];
    
                                    if(val !== undefined){
    
                                        if(typeof val === "string"){
                                            matchesRes.push(val.toLowerCase().indexOf(words.toLowerCase()) > -1);
                                        }
    
                                        if(typeof val === "number"){
                                            matchesRes.push(val == words);
                                        }
    
                                        if(Array.isArray(val)){

                                            const match = [];

                                            val.forEach(v => {
                                                match.push(v.toLowerCase().indexOf(words) > -1);
                                            });

                                            matchesRes.push(match.indexOf(true) > -1);
                                        }
    
                                    }
                                });
    
                                const res = matchesRes.indexOf(true) > -1;
    
                                found.push(res);
    
                            }else{
                                // Case when object is (null)

                                found.push(false);

                            }
    
    
                        }
    
                        if(typeof value === "string"){
                            found.push(value.toLowerCase().indexOf(words.toLowerCase()) > -1);
                            
                        }
    
                        if(typeof value === "number"){
                            found.push(value == words);

                        }
    
                        if(typeof value === "boolean"){

                            const active = ["ак", "акт", "актив", "активн", "активный"];
                            const unactive = ["не", "неак", "неакти", "неактив", "неактивн", "неактивный"];

                            const activeMatching = [];
                            active.forEach(option => {
                                activeMatching.push(words.toLowerCase().indexOf(option) > -1);
                            });

                            const unActiveMatching = [];
                            unactive.forEach(option => {
                                unActiveMatching.push(words.toLowerCase().indexOf(option) > -1);
                            });

                            const containsActiveState = activeMatching.indexOf(true) > -1,
                                  containsPassiveState = unActiveMatching.indexOf(true) > -1;
    
                            if(containsActiveState || containsPassiveState){
    
                                if(containsActiveState === true && value === true){
                                    found.push(true);
                                }else if(containsPassiveState === true && value === false){
                                    found.push(true);
                                }else{
                                    found.push(false);
                                }
    
                            }
    
                        }
    
                    }else{
                        found.push(false);
                    }
    
                });

                const hasAtLeastOneMatchWithinRow = found.indexOf(true) > -1;

                return hasAtLeastOneMatchWithinRow; 
            });
        
            return [...res];
        }else{
            return data;
        }
    }

    return (
        <StyledMUIDataTable
            title={title}
            data={filterList(data)}
            columns={columns}
            options={options}
            {...{ components }}
        />
    )

}, (prevProps, nextProps) => prevProps.count === nextProps.count && prevProps.title === nextProps.title && prevProps.data === nextProps.data && prevProps.columns === nextProps.columns);


const StyledMUIDataTable = styled(MUIDataTable)`
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1) !important;
    border-radius: 10px;
    padding: 10px; 

    & > div:nth-child(3){
        height: calc(100vh - 400px) !important;
        overflow-y:auto;


        ::-webkit-scrollbar {
            width: 5px;
        }

        ::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb {
            background: rgba(87, 98, 178, 0.5);
            box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
        }
    }


    .MuiToolbar-gutters {
        border: none !important;
    }

    .MuiToolbar-root {
        height: 40px !important;
        padding: 0;
        

        .MuiTypography-root {
            font-size: 18px;
        }

        .MUIDataTableToolbar-actions-17 {
            button {
                padding: 0 5px;
            }

            span:first-child {
                padding: 0 5px;
            }
        }
    }

    .MUIDataTableSelectCell-root-35 {
        display: none;
        border-radius: 5px;
    }

    tr {      
        border-radius: 5px;
    }

    tfoot {
        display: none;
    }
    
    table td, table th {
        border: none !important;
    } 

    thead {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px;

        tr {
            height: 60px;

            th {
                padding: 0 10px;
            }
        }
    } 

    tbody tr td {
        padding: 15px 10px;
        font-size:17px !important; 
    }
    
    thead th, thead span { 
        font-size: 17px;
        z-index:100;
        top:0;
        position:sticky !important;
        background-color:#fff;
    }

    tbody>tr:nth-child(even) {
        background-color: #F1F1F6;
    }

    @media (min-width: 600px) {
        .MuiToolbar-regular {
            min-height: 40px;
        }
    }
`;
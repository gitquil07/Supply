import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import styled from "styled-components";

import SearchIcon from '@material-ui/icons/YoutubeSearchedFor';
import PrintIcon from '@material-ui/icons/Receipt';
import DownloadIcon from '@material-ui/icons/GetApp';
import ViewColumnIcon from '@material-ui/icons/DynamicFeed';
import FilterIcon from '@material-ui/icons/GroupWork';

export const CustomMUIDataTable = React.memo(({ count, title, data, columns, customRowOptions }) => {

    const options = {
        filterType: 'dropdown',
        selectableRows: "none",
        rowsPerPage: count,
        ...customRowOptions
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
    return (
        <MuiThemeProvider>
            <StyledMUIDataTable
                title={title}
                data={data}
                columns={columns}
                options={options}
                {...{ components }}
            />
        </MuiThemeProvider>
    )

}, (prevProps, nextProps) => prevProps.count === nextProps.count && prevProps.title === nextProps.title && prevProps.data === nextProps.data && prevProps.columns === nextProps.columns);


const StyledMUIDataTable = styled(MUIDataTable)`
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1) !important;
    border-radius: 10px;
    padding: 10px; 
    height: calc(100vh - 280px);
    overflow-y: scroll;

    
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
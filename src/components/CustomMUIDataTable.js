import React from "react"; 
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import styled from "styled-components";

import SearchIcon from '@material-ui/icons/YoutubeSearchedFor';
import PrintIcon from '@material-ui/icons/Receipt';
import DownloadIcon from '@material-ui/icons/GetApp';
import ViewColumnIcon from '@material-ui/icons/DynamicFeed';
import FilterIcon from '@material-ui/icons/GroupWork';
import { Height } from "@material-ui/icons";

export const CustomMUIDataTable = React.memo(({count, title, data, columns }) => {

    const getMuiTheme = () => createMuiTheme({
        overrides: {
            MUIDataTable: {
                responsiveBase: {
                    maxHeight:"693px"
                }
          }
        }
      })

    console.log("custom table rendered");

    const options = {
        filterType: 'dropdown',
        selectableRows: "none",
        rowsPerPage: count
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
        <MuiThemeProvider theme={getMuiTheme()}>
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
    }
    
    thead th, thead span { 
        font-size: 17px;
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
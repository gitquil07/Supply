import MUIDataTable from "mui-datatables";
import styled from "styled-components";

export const StyledMUIDataTable = styled(MUIDataTable)`

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
        display: none;border-radius: 5px;
    }

    tr {      
        border-radius: 5px;
    }

    tfoot {
        display: none;
    }
    
    table td, table th {
        border: none !important;
        /* border: 1px solid #dddddd; */
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
        font-size: 18px;
    }

    tbody>tr:nth-child(odd) {
        background-color: #F1F1F6;
    }

    @media (min-width: 600px) {
        .MuiToolbar-regular {
            min-height: 40px;
        }
    }
`;
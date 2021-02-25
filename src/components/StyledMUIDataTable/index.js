import MUIDataTable from "mui-datatables";
import styled from "styled-components";

export const StyledMUIDataTable = styled(MUIDataTable)`

    box-shadow: 0px 0px 5px rgba(61, 61, 61, 0.26) !important;
    border-radius: 10px;

    .MuiToolbar-gutters {
        border: 1px solid #dddddd;
    }

    tfoot tr td div div {
        border: none !important;
    }
    
    table td, table th {
        border: 1px solid #dddddd;
    }
 
    
    thead th, thead span{
        font-weight: bold;
        font-size: 16px;
    }

    tbody>tr:nth-child(odd) {
        background-color: #E7E7E7;

        :hover {
            background-color: #F0F0F0;
        }
    }
`;
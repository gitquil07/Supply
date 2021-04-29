import styled from "styled-components";

export const Form = styled.div` 
    height: calc(100vh - 210px);
    background: #FFFFFF;
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1);
    border-radius: 10px;    
    padding: 20px; 
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(87, 98, 178, 0.5);
        box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }
`;
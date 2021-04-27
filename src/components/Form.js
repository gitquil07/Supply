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
        box-shadow: inset 0 0 6px #5762B2;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px #5762B2;
        border-radius: 10px;
    }
`;
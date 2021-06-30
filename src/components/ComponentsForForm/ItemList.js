import styled, { css } from "styled-components";

export const List = styled.div`
    width:100%;
    padding:10px;
    box-sizing:border-box;
    background-color:#fff;
    border-radius:5px;
    border:1px solid rgba(0, 0, 0, 0.15);
    display:flex;
    justify-content:space-between;

    ${({ direction }) =>
        direction ? css`
            flex-direction:column;
            row-gap:10px;
        ` : ""
    }

    @media(max-width:1233px){

        &{
            flex-direction:column;
            row-gap:20px;
        }

    }
    
`;

export const Item = styled.div`
    h4{
        margin:0 0 5px 0;
        font-size:18px;
        font-weight:normal;
    }
    span{
        font-size:14px;
        color: rgba(0, 0, 0, 0.5);
    }
`;

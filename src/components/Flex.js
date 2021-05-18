import styled from "styled-components";

export const FlexWithWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 15px 0;
`;

export const FlexForHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: ${props => props.m};
    padding: ${props => props.p};
`;

export const AddibleInput = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); 
    grid-gap: 10px;   
    margin: 20px 0;
    background: #F6F6FC;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px; 
`;

export const AddibleInputWithTrash = styled.div`
    display: grid;
    grid-template-columns: 2fr .1fr;
    gap: 10px;
    margin: 20px 0;
    background: #F6F6FC;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px; 
`;
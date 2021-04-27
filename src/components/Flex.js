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

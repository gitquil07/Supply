import styled from "styled-components"

export const MiniForm = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px;
    gap: 10px;
    display: grid;
    grid-template-columns: ${({ tc }) => tc};
    background: #F6F6FC;
    margin: 0 0 20px 0;
`;
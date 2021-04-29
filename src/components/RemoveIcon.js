import styled from "styled-components";
import Trash from "../assets/icons/trash.svg";

export const RemoveIcon = ({ clicked }) => <Icon onClick={clicked}><img src={Trash} alt="trash" /></Icon>

const Icon = styled.div`
    background: #EE8D8D;
    min-width: 50px;
    min-height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
`;
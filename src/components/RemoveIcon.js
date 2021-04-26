import styled from "styled-components";
import Trash from "../assets/icons/trash.svg";

export const RemoveIcon = ({ clicked }) => <Icon onClick={clicked}><img src={Trash} alt="trash" /></Icon>

const Icon = styled.div`
    background: #EE8D8D;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-radius: 5px;
`;
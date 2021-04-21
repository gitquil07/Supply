import styled from "styled-components";
import { Link } from "react-router-dom";

export const Button = ({ name, url }) => <IButton to={url}>{name}</IButton>

const IButton = styled(Link)`
    background: #08BB19;
    color: white;
    height: 50px;
    padding: 0 10px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer; 
    display: flex;
    text-decoration: none;
    justify-content: center;
    align-items: center;

    :hover {
        background: #65DE82;
    }
`;
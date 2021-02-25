import styled from "styled-components";
import { Link } from "react-router-dom";

export const Button = ({ name, url }) => <IButton to={url}>{name}</IButton>

const IButton = styled(Link)`
    min-width: 170px;
    background: #3FBD5D;
    color: white;
    padding: 15px 10px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer; 
    display: block;
    text-decoration: none;

    :hover {
        background: #65DE82;
    }
`;
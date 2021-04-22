import styled from "styled-components";
import { Link } from "react-router-dom";
import Add from "../assets/icons/add.svg";
import { CustomHeader } from "./CustomHeader";

export const Button = ({ name, url }) => <IButton to={url}>{name}</IButton>

export const ButtonWithIcon = ({ name, url, icon }) => {
    return (
        <CustomHeader>
            <IIButton to={url}>
                <img src={Add} alt="btn-alt" /> {name}
            </IIButton>
        </CustomHeader >
    )
}

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


const IIButton = styled(Link)`
    background: #5762B2;
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

    img {
        margin-right: 10px;
    }
`;

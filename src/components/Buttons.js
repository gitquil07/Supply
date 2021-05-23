import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Add from "../assets/icons/add.svg";
import { CustomHeader } from "./CustomHeader";

export const Button = ({ name, url, color, clickHandler }) => <IButton to={url} color={color} onClick={clickHandler}>{name}</IButton>

export const ButtonWithIcon = React.memo(({ name, url, clicked }) => {
    console.log("button rendered");
    return (
        <CustomHeader>
            <IIButton to={url} onClick={clicked}>
                <img src={Add} alt="btn-alt" /> {name}
            </IIButton>
        </CustomHeader >
    )
}, (prevProps, nextProps) => prevProps.clickHandler === nextProps.clickHandler && prevProps.url === nextProps.url && prevProps.name === nextProps.name);

const IButton = styled(Link)`
    background: ${props => props.color ? props.color : "#08BB19"};
    color: white;
    height: 56px;
    padding: 0 10px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer; 
    display: flex;
    text-decoration: none;
    justify-content: center;
    align-items: center; 

    :hover {
        background: ${props => props.color ? props.color : "#08BB19"};
    }
`;


const IIButton = styled(Link)`
    background: #5762B2;
    color: white;
    height: 56px;
    padding: 0 10px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer; 
    display: flex;
    text-decoration: none;
    justify-content: center;
    align-items: center;

    :hover {
        background: #2060B0;
    }

    img {
        margin-right: 10px;
    }
`;

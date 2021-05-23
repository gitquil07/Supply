import styled from "styled-components";
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Arrow from "../../assets/icons/arrow.svg";
import MenuItem from "@material-ui/core/MenuItem";

export const CustomSelector = ({ name, label, disabled, defaultValue, fullWidth, short, value, stateChange, children, multiple, errorVal}) => {

    const props = {
        labelId: "demo-simple-select-outlined-label",
        id: "demo-simple-select-outlined",
        name,
        value,
        disabled,
        defaultValue,
        onChange: stateChange
    };

    if(multiple){
        props.multiple = true;
        props.renderValue = selected => selected.join(", ");
    }

    return (
        <Wrapper short={short} fullWidth={fullWidth} errorVal={errorVal}>
            <FormControl variant="outlined" id="formControl">
                <img src={Arrow} alt="arrow" id="arrow" />
                <InputLabel id="label">{label}</InputLabel>
                    <Select {...props} >{children}</Select>
            </FormControl>
        </Wrapper>
    );

};


export const CustomSelectorAdd = ({ name, label, disabled, fullWidth, short, value, stateChange, openModal, children, errorVal}) => {
    return (
        <Wrapper short={short} fullWidth={fullWidth} errorVal={errorVal} >
            <FormControl variant="outlined" id="formControl">
                <img src={Arrow} alt="arrow" id="arrowSec" />
                <button className="add" disabled={disabled} onClick={openModal}>
                    <span className="circle"></span>
                </button>
                <InputLabel id="label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={value}
                    label="Age"
                    name={name}
                    onChange={stateChange}
                    disabled={disabled}
                >
                    {children}
                </Select>
            </FormControl>
        </Wrapper>
    );
}


export const EditableMenuItem = (props) => {

    const {
       override: {
           value,
           selected
        },
        children,
        stateChange
    } = props;

    console.log("props", props);
  
    return (
        <EditableItem value={value} selected={selected}>
            <p>
                <span className="itemText">{children}</span>

                {
                    !selected?
                            <span onClick={stateChange}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.16675 3.33325H3.33341C2.89139 3.33325 2.46746 3.50885 2.1549 3.82141C1.84234 4.13397 1.66675 4.55789 1.66675 4.99992V16.6666C1.66675 17.1086 1.84234 17.5325 2.1549 17.8451C2.46746 18.1577 2.89139 18.3333 3.33341 18.3333H15.0001C15.4421 18.3333 15.866 18.1577 16.1786 17.8451C16.4912 17.5325 16.6667 17.1086 16.6667 16.6666V10.8333" stroke="#808080" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.4167 2.08344C15.7483 1.75192 16.1979 1.56567 16.6667 1.56567C17.1356 1.56567 17.5852 1.75192 17.9167 2.08344C18.2483 2.41496 18.4345 2.8646 18.4345 3.33344C18.4345 3.80228 18.2483 4.25192 17.9167 4.58344L10.0001 12.5001L6.66675 13.3334L7.50008 10.0001L15.4167 2.08344Z" stroke="#808080" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            </span> 
                               : 
                            <span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.25 5L7.5 15L3.75 11.25" stroke="#5762B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span onClick={stateChange}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.16675 3.33325H3.33341C2.89139 3.33325 2.46746 3.50885 2.1549 3.82141C1.84234 4.13397 1.66675 4.55789 1.66675 4.99992V16.6666C1.66675 17.1086 1.84234 17.5325 2.1549 17.8451C2.46746 18.1577 2.89139 18.3333 3.33341 18.3333H15.0001C15.4421 18.3333 15.866 18.1577 16.1786 17.8451C16.4912 17.5325 16.6667 17.1086 16.6667 16.6666V10.8333" stroke="#5762B2" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M15.4167 2.08344C15.7483 1.75192 16.1979 1.56567 16.6667 1.56567C17.1356 1.56567 17.5852 1.75192 17.9167 2.08344C18.2483 2.41496 18.4345 2.8646 18.4345 3.33344C18.4345 3.80228 18.2483 4.25192 17.9167 4.58344L10.0001 12.5001L6.66675 13.3334L7.50008 10.0001L15.4167 2.08344Z" stroke="#5762B2" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                            </span>
                }
            </p>
        </EditableItem>
    );
}


const EditableItem = styled(MenuItem)`
    p{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin:0;


        
        .itemText{
            color: ${({selected}) => selected? "#5762B2" : "rgba(0, 0, 0, 0.5)"}
        }

        span svg:first-child{
            margin-right:8px;
        }
    }
`;

const Wrapper = styled.div`
    position: relative;

    #label {
        background-color: white;
    }

    #arrow,
    #arrowSec{
        position: absolute;
        transform: translate(-50%, -50%);
        z-index: 900;
        top:50%;
    }

    #arrow{
        right: 10px;
    }

    #arrowSec{
        right:45px;
    }

    .add:disabled{
        cursor: auto;
        background-color: rgba(87, 98, 178, 0.2);
    }   

    .add{
        position:absolute;
        width:30px;
        height:30px;
        border-radius:5px;
        background-color: rgba(87, 98, 178, 0.5);
        border:none;
        outline:none;
        cursor:pointer;
        transform: translate(-50%, -50%);
        top: 50%;
        right:0;
        z-index:900;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:0;

        .circle{
            width:22px;
            height:22px;
            border-radius:50%;
            border:2px solid #fff;
            box-sizing:border-box;
            position:relative;

            &::after,
            &::before{
                content:"";
                background-color:#fff;
                position:absolute;
                margin:0 auto;
                left:0;
                right:0;
            }

            &::after{
                width:10px;
                height:2px;
                top:calc(50% - 1px);
            }

            &::before{
                width:2px;
                height:10px;
                top:calc(50% - 5px);
            }
        }
    }

    .MuiFormControl-root { 
        width: 100%;
 

        .MuiInputBase-root .MuiSelect-root {
            padding-right: 50px;
            background: #fff;
        }

        .MuiInputBase-root .MuiSelect-root .editBtn {
            display:none;
        }

        fieldset {  
            border: 1px solid ${({errorVal}) => !errorVal? `rgba(0, 0, 0, 0.1) !important` : `red`};
        }    

        .MuiInputBase-root svg {
            display: none;
        }
    }
`;
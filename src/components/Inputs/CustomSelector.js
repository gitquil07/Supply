import styled from "styled-components";
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Arrow from "../../assets/icons/arrow.svg";

export const CustomSelector = ({ name, label, fullWidth, short, value, stateChange, children }) => {

    return (
        <Wrapper short={short} fullWidth={fullWidth}>
            <FormControl variant="outlined" id="formControl">
                <img src={Arrow} alt="arrow" id="arrow" />
                <InputLabel id="label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={value}
                    label="Age"
                    name={name}
                    onChange={stateChange}
                >
                    {children}
                </Select>
            </FormControl>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;
 

    #label {
        background-color: white;
    }

    #arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 900;
    }

    .MuiFormControl-root { 
        width: 100%;
 

        .MuiInputBase-root .MuiSelect-root {
            padding-right: 50px;
            background: #fff;
        }

        fieldset {  
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
        }    

        .MuiInputBase-root svg {
            display: none;
        }
    }
`;
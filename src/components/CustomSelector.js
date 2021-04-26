import styled, { css } from "styled-components";
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Arrow from "../assets/icons/arrow.svg";

export const CustomSelector = ({ label, fullWidth }) => {
    return (
        <Wrapper fullWidth={fullWidth}>
            <FormControl variant="outlined" id="formControl">
                <img src={Arrow} alt="arrow" id="arrow" />
                <InputLabel id="label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={age}
                    // onChange={handleChange}
                    label="Age"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty Twenty Twenty Twenty Twenty Twenty Twenty Twenty Twenty Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Wrapper>
    );
};

const Wrapper = styled.div`

    ${({fullWidth}) => {
        return fullWidth? 
        css`
            width: 100%;
            margin: 0 0 10px 0;
        `: 
        css`
            max-width: 300px;
            min-width: 250px;            
        `
    }}
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
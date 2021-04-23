import styled from "styled-components";
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Arrow from "../assets/icons/arrow.svg";

export const CustomSelector = () => {
    return (
        <Wrapper>
            <img src={Arrow} alt="arrow" id="arrow" />
            <FormControl variant="outlined">
                <InputLabel shrink id="demo-simple-select-placeholder-label-label"> Выберите завод </InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={"asdasdasd"}
                    // onChange={handleChange}
                    displayEmpty
                >
                    <MenuItem value="" selected>Завод</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;   
    position: relative;

    #arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translate(-50%, -50%)
    }

    .MuiFormControl-root {
        width: 100%;
        height: 55px;

        fieldset { 
            height: 55px;
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
        }    

        .MuiInputBase-root {
            height: 55px;
            overflow: hidden; 

            input {
                width: 100%;
                height: 55px; 
            }

            svg {
                display: none;
            }
        }
    
        select:required:invalid {
            color: #666;
        }
        
        option[value=""][disabled] {
            display: none;
        }
      
        option {
            color: #000;
        }
    }

    label {
        background-color: white;
        padding: 0 5px;
    }
`;
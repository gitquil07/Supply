import styled from "styled-components";
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Arrow from "../../assets/icons/arrow-for-pagination.svg";

export const SmallSelectForPagination = ({ stateChange, value }) => {
    return (
        <Wrapper>
            <FormControl variant="outlined" id="formControl">
                <img src={Arrow} alt="arrow" id="arrow" />
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={value}
                    onChange={stateChange}
                >
                    <MenuItem value={30} selected={value === 30}>30</MenuItem>
                    <MenuItem value={50} selected={value === 50}>50</MenuItem>
                    <MenuItem value={100} selected={value === 100}>100</MenuItem>
                </Select>
            </FormControl>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;
    height: 40px;

    #arrow {
        position: absolute;
        right: 7px;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 900; 
    }

    .MuiFormControl-root { 
        width: 100%;
        height: 40px;

        .MuiInputBase-root {
            height: 40px;

            .MuiSelect-root {
                padding: 0 45px 0 15px;
                background: #fff;
                height: 40px;
                display: flex;
                align-items: center;
            }
        }

        fieldset {  
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
        }    

        .MuiInputBase-root svg {
            display: none;
        }
    }
`;
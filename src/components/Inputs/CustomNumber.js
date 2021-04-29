import styled, { css } from "styled-components";
import TextField from '@material-ui/core/TextField';

export const CustomNumber = ({ name, value, label, stateChange, short, fullWidth}) => {
    return (
        <Wrapper short={short} fullWidth={fullWidth}>
            <TextField type="number" name={name} value={value} label={label} variant="outlined" onChange={e => stateChange(e)} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%; 
    min-width: 100px;
    ${({fullWidth}) => { 
        return fullWidth? 
        css`
            width:100%;
        `:
        css`
            max-width: ${props => props.short ? "175px" : "300px"};
        `
    }}
    

    .MuiFormControl-root  {
        width: 100%;
        
        .MuiInputBase-root {
            background: #fff;
        }

        fieldset {
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
        }
    }  
`;
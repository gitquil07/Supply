import styled, { css } from "styled-components";
import TextField from '@material-ui/core/TextField';

export const CustomInput = ({ label, change, short, fullWidth}) => {
    return (
        <Wrapper short={short} fullWidth={fullWidth}>
            <TextField label={label} variant="outlined" onChange={e => change(e)} />
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
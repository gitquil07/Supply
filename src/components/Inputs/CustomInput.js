import styled from "styled-components";
import TextField from '@material-ui/core/TextField';

export const CustomInput = ({ name, value, label, stateChange, short, fullWidth}) => {
    return (
        <Wrapper short={short} fullWidth={fullWidth}>
            <TextField name={name} value={value} label={label} variant="outlined" onChange={e => stateChange(e)} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%; 

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
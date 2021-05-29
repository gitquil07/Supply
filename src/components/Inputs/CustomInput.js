import styled from "styled-components";
import TextField from '@material-ui/core/TextField';

export const CustomInput = ({ name, value, label, type, required, stateChange, short, fullWidth, errorVal, disabled, width}) => {
    return (
        <Wrapper short={short} fullWidth={fullWidth} errorVal={errorVal} width={width}>
            <TextField type={type} required={required} name={name} value={value} label={label} disabled={disabled} variant="outlined" onChange={e => stateChange(e)} />
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
            border: 1px solid ${({errorVal}) => !errorVal? `rgba(0, 0, 0, 0.1) !important` : `red`};
        }
    }  
`;
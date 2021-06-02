import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

export const CustomInput = ({ name, value, label, type, required, stateChange, short, fullWidth, errorVal, disabled, width}) => {
    return (
        <Wrapper short={short} fullWidth={fullWidth} errorVal={errorVal} width={width}>
            <TextField type={type} required={required} name={name} value={value} label={label} disabled={disabled} variant="outlined" onChange={e => stateChange(e)} />
        </Wrapper>
    );
};

export const CustomInputWithComponent = ({ name, value, label, type, required, stateChange, short, fullWidth, errorVal, disabled, width, component}) => {
    return (
        <RelativeWrapper short={short} fullWidth={fullWidth} errorVal={errorVal} width={width}>
                <TextField type={type} required={required} name={name} value={value} label={label} disabled={disabled} variant="outlined" onChange={e => stateChange(e)} />
                <span className="container">{component}</span>
        </RelativeWrapper>
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

const RelativeWrapper = styled(Wrapper)`
    &{
        position: relative;
    }

    .container{
        position:absolute;
        top:calc(50% - 10px);
        right:20px;
    }
`;
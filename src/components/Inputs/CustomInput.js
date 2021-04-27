import styled from "styled-components";
import TextField from '@material-ui/core/TextField';

export const CustomInput = ({ label, change }) => {
    return (
        <Wrapper>
            <TextField label={label} variant="outlined" onChange={e => change(e)} />
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
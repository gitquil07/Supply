import styled from "styled-components";
import TextField from '@material-ui/core/TextField';

export const CustomLongInput = ({ label, change }) => {
    return (
        <Wrapper>
            <TextField
                label={label}
                variant="outlined"
                onChange={e => change(e)}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%; 
    height: 100%;
    min-width: 100px;
    max-width: 300px;
 
    .MuiFormControl-root  {
        width: 100%;
        height: 100%;  

        .MuiInputBase-root {
            background: #fff;
            height: 100%;

            input {
                height: 100%;

            }
        }

        fieldset {
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
            height: 100%;
        }
    }  
`;
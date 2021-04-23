import { useState } from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';

export const CustomInput = ({ label, placeholder, change }) => {
    const [placeholderText, setPlaceHolderText] = useState(placeholder)
    return (
        <Wrapper>
            <TextField
                label={label}
                variant="outlined"
                value={placeholderText}
                onClick={() => setPlaceHolderText("")}
                onChange={e => change(e)}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;

    .MuiFormControl-root  {
        width: 100%;
    }
`;
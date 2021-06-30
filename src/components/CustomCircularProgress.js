import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";

const CustomCircularProgress = () => {
    return (
        <ProgressContainer>
            <StyledCircularProgress/>      
        </ProgressContainer>
    );

}

export default CustomCircularProgress;

const ProgressContainer = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const StyledCircularProgress = styled(CircularProgress)`
    .MuiCircularProgress-svg{
        color: #47558e
    }
`;
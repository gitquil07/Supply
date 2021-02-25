import styled from "styled-components";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { IconButton } from "@material-ui/core"; 

export const User = () => {
    return (
        <Wrapper>
            <IconButton style={{ color: "white" }}>
                <PowerSettingsNewIcon />
            </IconButton>
            <Name>Admin</Name>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: 65px;
    display: flex; 
    align-items: center; 
    box-sizing: border-box;
    padding-left: 5px;
    color: white;
    background: rgba(0, 0, 0, 0.4);
`;

const Name = styled.div`
    font-weight: bold;
    padding-left: 22px;
`;
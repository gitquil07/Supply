import styled from "styled-components";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from "react-redux";
import { useState } from "react";
import { Title } from "./Title";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";


export const Header = ({ menuIconClicked }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const title = useSelector(state => state.title);
    const history = useHistory();
    const { setAuth } = useContext(UserContext);

    const logout = () => {
        localStorage.removeItem("supply_token");
        history.push("/login");
        setAuth("");
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Wrapper>
            <span>
                <IconButton onClick={menuIconClicked}>
                    <MenuIcon />
                </IconButton>

                <Title name={title} />
            </span>

            <Account>
                <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                    <AccountCircle fontSize="large" style={{ color: "grey" }} />
                </IconButton>
                <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={logout}>Выйти sad</MenuItem>
                    <MenuItem onClick={handleClose}>Мой аккаунт</MenuItem>
                </Menu>
            </Account>
        </Wrapper>
    );
};


const Wrapper = styled.div`
    width: 100%;
    height: 60px;
    background-color: #fff;
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1) !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    span {
        display: flex;
        align-items: center;
    }
`;

const Account = styled.div``;
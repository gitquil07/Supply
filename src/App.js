import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Sidebar } from './components/Sidebar';
import Routes from './routes';
import styled from "styled-components";
import Background from "./assets/bg.jpg";

import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Title } from './components/Title';

const App = () => {
  const [drawer, setDrawer] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper>
      <Header open={drawer}>
        <span>
          <IconButton onClick={() => setDrawer(!drawer)}>
            <MenuIcon />
          </IconButton>

          <Title name={document.title} />
        </span>

        <Account>
          <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
            <AccountCircle fontSize="large" style={{ color: "grey" }} />
          </IconButton>
          <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Выйти</MenuItem>
            <MenuItem onClick={handleClose}>Мой аккаунт</MenuItem>
          </Menu>
        </Account>
      </Header>

      <StyledDrawer variant="persistent" anchor="left" open={drawer}>
        <Sidebar />
      </StyledDrawer>

      <Main open={drawer}>
        <Routes />
      </Main>
    </Wrapper>
  );
}

export default App;


const Wrapper = styled.div`
  width: 100%;
`;

const Main = styled.div` 
  margin-top: 20px;
  margin-left: ${props => props.open ? "290px" : "20px"};
  padding-right: 20px;
`;

const Header = styled.div`
  width: ${props => props.open && "calc(100% - 270px)"};
  margin-left: ${props => props.open && "270px"};
  height: 60px;
  background-color: #fff;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1) !important;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    display: flex;
    align-items: center;

  }
`;

const StyledDrawer = styled(Drawer)`
  width: 270px; 

  .MuiDrawer-paper {
    width: 270px;
    background-image: url(${Background});
    background-size: cover; 
  }
`;

const Account = styled.div`

`;
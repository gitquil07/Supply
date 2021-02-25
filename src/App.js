import React, { useState } from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Sidebar } from './components/Sidebar';
import Routes from './routes';
import styled from "styled-components";
import { User } from './components/Sidebar/user';
import Background from "./assets/bg.jpg";

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: "270px",
  },
}));

const App = () => {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(true);

  return (
    <Wrapper>
      <StyledAppBar position="fixed" open={drawer}>
        <Toolbar style={{ padding: "0 10px" }}>
          <IconButton onClick={() => setDrawer(!drawer)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>

      <StyledDrawer variant="persistent" anchor="left" open={drawer}>
        <User />
        <Sidebar />
      </StyledDrawer>

      <Main open={drawer}>
        <Routes />
      </Main>
    </Wrapper >
  );
}

export default App;


const Wrapper = styled.div``;

const Main = styled.div`
  background-color: red;
  margin-top: 80px;
  margin-left: ${props => props.open ? "290px" : "20px"};
`;

const StyledAppBar = styled(AppBar)`
  background-color: #fff;
  width: ${props => props.open && "calc(100% - 270px)"};
`;

const StyledDrawer = styled(Drawer)`
  width: 270px; 

  .MuiDrawer-paper {
    width: 270px;
    background-image: url(${Background});
    background-size: cover; 
  }
`;
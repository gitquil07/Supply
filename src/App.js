import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Sidebar } from './components/Sidebar';
import Routes from './routes';
import styled from "styled-components";
import { User } from './components/Sidebar/user';
import Background from "./assets/bg.jpg";

const App = () => {
  const [drawer, setDrawer] = useState(true);

  return (
    <Wrapper>
      <Header open={drawer}>
        <IconButton onClick={() => setDrawer(!drawer)}>
          <MenuIcon />
        </IconButton>
      </Header>

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


const Wrapper = styled.div`
  width: 100%;
`;

const Main = styled.div` 
  margin-top: 10px;
  margin-left: ${props => props.open ? "290px" : "20px"};
  padding-right: 20px;
`;

const Header = styled.div`
  width: ${props => props.open && "calc(100% - 270px)"};
  margin-left: ${props => props.open && "270px"};
  height: 60px;
  background-color: #fff;
  box-shadow: -1px 1px 8px 0px rgba(67,67,67,0.66);
  -webkit-box-shadow: -1px 1px 8px 0px rgba(67,67,67,0.66);
  -moz-box-shadow: -1px 1px 8px 0px rgba(67,67,67,0.66); 
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledDrawer = styled(Drawer)`
  width: 270px; 

  .MuiDrawer-paper {
    width: 270px;
    background-image: url(${Background});
    background-size: cover; 
  }
`;
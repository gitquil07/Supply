import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { Sidebar } from './components/Sidebar';
import Routes from './routes';
import styled from "styled-components";
import Background from "./assets/bg.jpg";
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Auth from "./routes/login";
import { UserContext } from "./context/UserContext";
import { Header } from './components/Header';

const App = () => {

  const [auth, setAuth] = useState(""),
        token = localStorage.getItem("supply_token");

  return (
    <>
      <NotificationContainer/>
      <UserContext.Provider value={{
        setAuth
      }}>
        {
          token?  <ProtectedPages /> : <Auth />
        }
      </UserContext.Provider>
    </>
  );
};


const ProtectedPages = () => {
  const [drawer, setDrawer] = useState(true);

  return (
    <Wrapper>
      <StyledDrawer variant="persistent" anchor="left" open={drawer}>
        <Sidebar />
      </StyledDrawer>

      <Main open={drawer}>
        <Header menuIconClicked={() => setDrawer(!drawer)} drawer={drawer} />
        <Contents>
          <Routes />
        </Contents>
      </Main>
    </Wrapper>
  );
}



export default App;

const Wrapper = styled.div`
  width: 100%;
`;

const Main = styled.div`
  min-height: 100vh;
  margin-left: ${props => props.open ? "270px" : "20px"};
  position: relative;
`;

const StyledDrawer = styled(Drawer)`
  width: 270px; 

  .MuiDrawer-paper {
    width: 270px;
    background-image: url(${Background});
    background-size: cover; 
  }
`;

const Contents = styled.div`
  margin: 0 20px;
`;
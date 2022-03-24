import logo from './logo.svg';
import './App.css';
import CardsDisplay from "./components/CardsDisplay";
import NavBar from "./components/Navbar";
import Spread from "./components/Spread";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Route, Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import AuthService from './services/auth.service';
import { MuiThemeProvider } from '@material-ui/core';


function App() {

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"))
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"))
    }
  }, [])

  const logOut = () => {
    AuthService.logout();
  }


  const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#ba68c8',
      },
      secondary: {
        main: '#ede7f6',
      },
    },
    components: {
      Accordion: {
        primary: {
          main: '#ba68c8',
        },
      }
    }
  });


  return (
    <ThemeProvider theme = {theme}>
    <div className="App p-3">
      <NavBar theme={theme} />
      <BrowserRouter>
        <Route exact path="/cards">
          <CardsDisplay theme={theme} />
        </Route>
        <Route exact path="/spreads">
          <Spread theme={theme} />
        </Route>
        <Route exact path="/login">
          <Login theme={theme} />
        </Route>
        <Route exact path="/register">
          <Register theme={theme} />
        </Route>
      </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;

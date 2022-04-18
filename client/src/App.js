import logo from './logo.svg';
import './App.css';
import CardsDisplay from "./components/CardsDisplay";
import NavBar from "./components/Navbar";
import Spread from "./components/Spread";
import { BrowserRouter, Route, Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core';


function App() {

 


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
      accordion: {
        primary: {
          main: '#ba68c8',
        },
      },
      button: {
        fontFamily: [
          'Dancing Script',
          'cursive'
        ].join(','),
      }
    },
  });


  return (
    <ThemeProvider theme = {theme}>
    <div className="App p-3">
      <NavBar theme={theme} />
      <BrowserRouter>
        <Route exact path={["/cards", "/"]}>
          <CardsDisplay theme={theme} />
        </Route>
        <Route exact path="/spreads">
          <Spread theme={theme} />
        </Route>
      </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Cards from "./components/Cards";
import NavBar from "./components/Navbar";
import Spread from "./components/Spread";
import { BrowserRouter, Route, Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';


function App() {

  // const [selected, setSelected] = useState({});
  
  // const changeSelected = (card) => {
  //   setSelected(card);
  // }

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
    <div className="App p-3">
      <NavBar theme={theme} />
      <BrowserRouter>
        <Route exact path="/cards">
          <Cards theme={theme} />
        </Route>
        <Route exact path="/spreads">
          <Spread theme={theme}/>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;

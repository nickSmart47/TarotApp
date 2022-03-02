import logo from './logo.svg';
import './App.css';
import Cards from "./components/Cards"
import {BrowserRouter, Route, Router} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <Cards />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import Login from "./components/login/Login" 
import Transaction from "./components/Transaction/transaction"
import Footer from "./components/sidebar/Footer"
import Header from "./components/sidebar/Header"

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Home from './components/home/Home';

function App() {
  return ( <Router>
      <Switch>
        <Route path="/transaction">
          <Header />
          <Transaction />
          <Footer />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path exact="/">
          <Login />
        </Route>
      </Switch>
    </Router>
    //</div>
  );
}

export default App;

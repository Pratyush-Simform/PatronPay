import './App.css';
import Login from "./components/login/Login" 
import Transaction from "./components/Transaction/transaction"
import Header from "./components/sidebar/Header"
import Footer from "./components/sidebar/Footer"

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

function App() {
  return ( <Router>
    {/* // <div className="App"> */}
      {/* <header className="App-header">
        <Sidebar />                                                                         
      </header> */}
     
      <Switch>
        <Route path="/transaction">
          <Header />
        <Transaction />
        <Footer />
        </Route>
        {/* <Route path="/login">
          <Login />
        </Route> */}
        <Route path exact="/">
          <Login />
        </Route>
      </Switch>
    </Router>
    //</div>
  );
}

export default App;

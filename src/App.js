import logo from './logo.svg';
import './App.css';
import Sidebar from "./components/sidebar/Sidebar"
import Login from "./components/login/Login" 
import Transaction from "./components/Transaction/transaction"

import {
	BrowserRouter as Router,
	Route,
	Link,
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
          <Transaction />
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

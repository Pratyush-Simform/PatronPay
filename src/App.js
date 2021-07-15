import "./App.css";
import Login from "./components/login/Login";
import Transaction from "./components/Transaction/transaction";
import Header from "./components/sidebar/Header";
import Footer from "./components/sidebar/Footer";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProfileItems from "./components/profile/ProfileItems";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/transaction">
          <Header />
          <Transaction />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header />
          <ProfileItems />
          <Footer />
        </Route>
        <Route path exact="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

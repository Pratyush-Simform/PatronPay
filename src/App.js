import "./App.css";
import Login from "./components/login/Login";
import Transaction from "./components/Transaction/transaction";
import Header from "./components/sidebar/Header";
import Footer from "./components/sidebar/Footer";
import PaymentProfiles from "./components/profile/PaymentProfiles";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProfileItems from "./components/profile/ProfileItems";
import Order from "./components/order/Order";

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
        <Route path="/paymentProfile">
          <Header />
          <PaymentProfiles />
          <Footer />
        </Route>
        <Route path="/orders">
            <Header name="Open Orders"/>
          <Order />
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

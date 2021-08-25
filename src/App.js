import "./App.css";
import Login from "./components/login/Login";
import Transaction from "./components/Transaction/transaction";
import Header from "./components/sidebar/Header";
import Footer from "./components/sidebar/Footer";
import PaymentProfiles from "./components/profile/PaymentProfiles";
import MemberPayment from "./components/payments/MemberPayment";
import CardPayments from "./components/payments/CardPayments";
import CashPayments from "./components/payments/CashPayments";

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
        <Route path="/memberPayments">
          <Header />
          <MemberPayment />
          <Footer />
        </Route>
        <Route path="/cashlessPayments">
          <Header />
          <CardPayments />
          <Footer />
        </Route>
        <Route path="/cashPayments">
          <Header />
          <CashPayments />
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

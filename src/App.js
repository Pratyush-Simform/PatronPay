import "./App.css";
import Login from "./components/login/Login";
import Transaction from "./components/Transaction/transaction";
import PaymentProfiles from "./components/profile/PaymentProfiles";
import MemberPayment from "./components/payments/MemberPayment";
import CardPayments from "./components/payments/CardPayments";
import CashPayments from "./components/payments/CashPayments";
import Layout from "./layout/Layout";
import Users from "./components/users/Users";

import { BrowserRouter as Router, Route } from "react-router-dom";
import ProfileItems from "./components/profile/ProfileItems";
import Order from "./components/order/Order";

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/transaction" component={Transaction} />
        <Route path="/profile" component={ProfileItems} />
        <Route path="/paymentProfile" component={PaymentProfiles} />
        <Route path="/memberPayments" component={MemberPayment} />
        <Route path="/cashlessPayments" component={CardPayments} />
        <Route path="/cashPayments" component={CashPayments} />
        <Route path="/orders" component={Order} />
        <Route path="/users" component={Users} />
        <Route path exact="/" component={Login} />
      </Layout>
    </Router>
  );
}

export default App;

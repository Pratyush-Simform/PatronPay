import React, {Suspense} from "react"
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./layout/Layout"
const Transaction = React.lazy(() => import('./components/Transaction/transaction'));
const MemberPayment = React.lazy(() => import('./components/payments/MemberPayment'));
const CardPayments = React.lazy(() => import('./components/payments/CardPayments'));
const CashPayments = React.lazy(() => import('./components/payments/CashPayments'));
const Users = React.lazy(() => import('./components/users/Users'));
const ProfileItems = React.lazy(() => import('./components/profile/ProfileItems'));
const Order = React.lazy(() => import('./components/order/Order'));
const Login = React.lazy(() => import('./components/login/Login'));
const PaymentProfiles = React.lazy(() => import('./components/profile/PaymentProfiles'));


function App() {
  return (
    <Router>
      <Suspense fallback={"...loading"}>
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
    </Suspense>
    </Router>
  );
}

export default App;

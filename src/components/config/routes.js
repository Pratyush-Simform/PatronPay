import { lazy } from "react";

import PrivateRoute from "./PrivateRoute.component";
import ProtectedRoute from "./ProtectedRoute";

export const routes = {
  login: {
    name: "Login",
    path: "/Login",
    component: lazy(() => import("../../components/login/Login")),
    type: ProtectedRoute,
  },
  transaction: {
    name: "Transaction",
    path: "/transaction",
    component: lazy(() => import("../../components/Transaction/transaction")),
    type: PrivateRoute,
  },
  transactionItems: {
    name: "Transaction Items",
    path: "/transactionItems",
    component: lazy(() => import("../../components/Transaction/TransactionItems")),
    type: PrivateRoute,
  },
  profile: {
    name: "Profile",
    path: "/profile",
    component: lazy(() => import("../../components/profile/ProfileItems")),
    type: PrivateRoute,
  },
  paymentProfile: {
    name: "Payment Profile",
    path: "/paymentProfile",
    component: lazy(() => import("../../components/profile/PaymentProfiles")),
    type: PrivateRoute,
  },
  userAssignment: {
    name: "User Assignment",
    path: "/userAssignment",
    component: lazy(() => import("../../components/profile/UserAssignment")),
    type: PrivateRoute,
  },
  memberPayments: {
    name: "Member Payments",
    path: "/memberPayments",
    component: lazy(() => import("../../components/payments/MemberPayment")),
    type: PrivateRoute,
  },
  cashlessPayments: {
    name: "Cashless Payments",
    path: "/cashlessPayments",
    component: lazy(() => import("../../components/payments/CardPayments")),
    type: PrivateRoute,
  },
  cashPayments: {
    name: "Cash Payments",
    path: "/cashPayments",
    component: lazy(() => import("../../components/payments/CashPayments")),
    type: PrivateRoute,
  },
  orders: {
    name: "Orders",
    path: "/orders",
    component: lazy(() => import("../../components/order/Order")),
    type: PrivateRoute,
  },
  users: {
    name: "Users",
    path: "/users",
    component: lazy(() => import("../../components/users/Users")),
    type: PrivateRoute,
  },
  myorganisation: {
    name: "My Organisation",
    path: "/myorganisation",
    component: lazy(() => import("../../components/organisation/MyOrganisation")),
    type: PrivateRoute,
  },
  debuglogs: {
    name: "Debug Logs",
    path: "/debuglogs",
    component: lazy(() => import("../../components/debugLogs/DebugLogs")),
    type: PrivateRoute,
  },
  emptyRoute: {
    name: "DefautlRoute",
    path: "/",
    component: lazy(() => import("../../components/login/Login")),
    type: ProtectedRoute,
  },
};

export const renderRoutes = Object.entries(routes);
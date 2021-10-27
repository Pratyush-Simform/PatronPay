import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import { renderRoutes } from "./components/config/routes"
import { CircularProgress } from "@material-ui/core";

const Spinner = () => {
  return (
    <div className="spinner-main">
      <div className="spinner">
        <CircularProgress />
        <div className="spinner__text">Loading...</div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
       <Suspense fallback={<Spinner />}>
         <Layout>
          <Switch>
            {renderRoutes.map(([key, route]) => {
              return (
                <route.type
                  key={key}
                  exact
                  render={() => <route.component />}
                  path={route.path}
                />
              );
            })}
          </Switch>
          </Layout>
        </Suspense>
    </Router>
  );
}

export default App;

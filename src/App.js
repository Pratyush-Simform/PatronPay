import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Layout from "./layout/Layout";
import { renderRoutes } from "./components/config/routes"

function App() {
  return (
    <Router>
       <Suspense fallback={"...loading"}>
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

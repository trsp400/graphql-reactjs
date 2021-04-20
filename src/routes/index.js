import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Launches from "../pages/launches";
import Rockets from "../pages/rockets";
import Home from "../App";

import Layout from "../layouts";

const Routes = ({ children }) => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/launches" exact>
            <Launches />
          </Route>

          <Route path="/rockets" exact>
            <Rockets />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;

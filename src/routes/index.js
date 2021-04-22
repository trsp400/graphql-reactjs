import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../pages/home';
import Launches from '../pages/launches';
import Rockets from '../pages/rockets';
import NewLaunches from '../pages/new_launches';

import Layout from '../layouts';

const Routes = () => {
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
          <Route path="/new_launches" exact>
            <NewLaunches />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;

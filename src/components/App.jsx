'use strict';

import React from 'react';
import Layout from './Layout';
import CreateSale from './CreateSale';
import Dashboard from './Dashboard';
import { Router, Route, RouterContext, Link, browserHistory } from 'react-router';

class App extends React.Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <Route path="create" component={CreateSale} />
          <Route path="dashboard" component={Dashboard} />
        </Route>
      </Router>
    )
  }

}

export default App;

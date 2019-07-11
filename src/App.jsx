import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Users from './pages/Users/Users';
import User from './pages/User/User';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Users} />
      <Route path="/users/:id" component={User} />
    </Switch>
  );
};

export default App;

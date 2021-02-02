import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Login from './Login';
import Dashboard from './Dashboard';
import Similar from './Similar';
import CreateUser from './CreateUser';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/login" >
            <Login />
          </Route>
          <ProtectedRoute path="/" exact>
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute path="/create">
            <CreateUser />
          </ProtectedRoute>
          <ProtectedRoute path="/similar">
            <Similar />
          </ProtectedRoute>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
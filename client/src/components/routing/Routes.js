import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import Stepper from '../layout/Stepper';
import PrivateRoute from '../routing/PrivateRoute';
import About from '../../components/assessment-rank/About';

const Routes = (props) => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/new-assessment" component={Stepper} />
        <PrivateRoute exact path="/assessments/:id" component={Stepper} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

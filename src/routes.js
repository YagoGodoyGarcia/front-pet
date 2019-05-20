import React from "react";
import Inicio from './components/pages/inicio'
import { BrowserRouter, Route, Switch } from "react-router-dom";



const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Inicio} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
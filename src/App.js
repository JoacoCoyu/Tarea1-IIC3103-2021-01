import React from 'react';
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import Home from './js/components/home';
import NavBar from './js/components/navbar';
import BreakingBad from './js/components/breaking-bad';
import BetterCallSaul from './js/components/better-call-saul';


const App = () => {
  return (
    <Router>
    <div>

      <NavBar />

      <Switch>
        
        <Route exact path="/">
          <Home />
        </Route>
        
        <Route path="/breaking-bad">
          <BreakingBad />
        </Route>

        <Route path="/better-call-saul">
          <BetterCallSaul />
        </Route>
      
      </Switch>

    </div>
  </Router>
  );
}

export default App;


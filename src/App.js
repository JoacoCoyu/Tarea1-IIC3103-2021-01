import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './js/components/home';
import NavBar from './js/components/navbar';
import BreakingBad from './js/components/breaking-bad';

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
      
      </Switch>
    </div>
  </Router>
  );
}

export default App;


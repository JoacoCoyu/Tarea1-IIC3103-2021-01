import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './js/components/home';
import NavBar from './js/components/navbar';
import BreakingBad from './js/components/breaking-bad';
import BetterCallSaul from './js/components/better-call-saul';
import ChrView from "./js/components/chr-view";


class App extends Component {

  constructor(props){
    super(props);
      this.state = {
        searchName: "no name"
      }
  } 

  handleSearchName = (childData) =>{
    this.setState({ searchName: childData })
  }

  render() {
      return (
            <Router>
            <div>

              <NavBar searchNameCallback={this.handleSearchName}
              searchName={this.state.searchName} />

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

                <Route path="/character-search">
                  <ChrView searchNameValue={this.state.searchName} />
                </Route>
              
              </Switch>

            </div>
          </Router>
      );
  }
}

export default App;


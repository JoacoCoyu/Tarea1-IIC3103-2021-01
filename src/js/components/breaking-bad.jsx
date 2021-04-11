import React, { Component } from 'react'
import axios from 'axios';
import '../../style/App.css';
import { BrowserRouter as Router, Switch, 
  Route, Link, useParams, useRouteMatch, withRouter } from "react-router-dom";
import EpisodeDropdownBB from './dropdownbb'
import EpisodiosBB from "./episodesBB"


const countTemp = (episodesArray) => {
  var maxTemp = 0;
  episodesArray.forEach(function (episode) {
    if (parseInt(episode.season) > maxTemp) {
      maxTemp = parseInt(episode.season);
    }
  });
  return maxTemp;
}


const assignTemp = (nTemps) => {
  var t_index;
  var tempArray = [];
  for (t_index = 1; t_index <= nTemps; t_index++) {
    tempArray.push(t_index)
  }
  return tempArray;
}


class BreakingBad extends Component {
  state = {
    episodesBB: [],
    nTempBB: 0,
    tempBB: [],
    epiData: null
  }

  async componentDidMount() {
    await axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad`)
      .then(res => {
        const episodesBB = res.data;
        this.setState({ episodesBB });
      })

    const nTempBB = countTemp(this.state.episodesBB)
    this.setState({ nTempBB })

    const tempBB = assignTemp(this.state.nTempBB)
    this.setState({ tempBB })
  }

  handleCallback = (childEpidData) =>{
    this.setState({epiData: childEpidData})
    console.log("aqui me llego el id", this.state.epiData)
  }


  render() {
    return (
        <div class="row">
        { this.state.tempBB.map(temp => 
        <div class="card w-25">
          <div class="card-body">
            <h4 class="card-title">Season {temp}</h4>

            <EpisodeDropdownBB dataEpisodeDict = {this.state.episodesBB} dataTemp = {temp} 
            parentCallback = {this.handleCallback} />

          </div>
        </div>
        
          )}          
          <Switch>
            <Route path={`/breaking-bad/episodes/:episodeId`}>
              <EpisodiosBB dataEpisodeId = {this.state.epiData} />
            </Route>
          </Switch>
      </div>
      
    )
  }
}

export default BreakingBad;
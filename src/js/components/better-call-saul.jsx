import React, { Component } from 'react'
import axios from 'axios';
import '../../style/App.css';
import { BrowserRouter as Router, Switch, 
  Route, Link, useParams, useRouteMatch, withRouter } from "react-router-dom";
import EpisodeDropdownBCS from './dropdownbcs'
import EpisodiosBCS from "./episodesBCS"
import ShowTemEpisodesBCS from "./showTempEpisodesBCS"


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


class BetterCallSaul extends Component {

  constructor(props){
    super(props);
      this.state = {
          episodesBCS: [],
          nTempBCS: 0,
          tempBCS: [],
          epiData: null,
          tempSelected: 0,
          showTempSelected: false
      }
  }

  async componentDidMount() {
    await axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul`)
      .then(res => {
        const episodesBCS = res.data;
        this.setState({ episodesBCS });
      })

    const nTempBCS = countTemp(this.state.episodesBCS)
    this.setState({ nTempBCS })

    const tempBCS = assignTemp(this.state.nTempBCS)
    this.setState({ tempBCS })
  }

  handleCallback = (childEpidData) =>{
    this.setState({epiData: childEpidData})
    this.setState({ showTempSelected: false })
  }

  handleCallbackTemp = (childTempData) =>{
    this.setState({tempSelected: childTempData[0]})
    this.setState({ showTempSelected: !this.state.showTempSelected })    
  }


  render() {
    return (
      <div class="episodes-main-container">
          <div class="row">
          { this.state.tempBCS.map(temp => 
          <div class="card w-25">
            <div class="card-body">
              <h4 class="card-title">Season {temp}</h4>

              <EpisodeDropdownBCS dataEpisodeDict = {this.state.episodesBCS} dataTemp = {temp} 
              parentCallback = {this.handleCallback} />

            </div>
          </div>
          
            )}          
            <Switch>
              <Route path={`/better-call-saul/episodes/:episodeId`}>
                <EpisodiosBCS dataEpisodeId = {this.state.epiData}
                tempCallBack = {this.handleCallbackTemp}  />
              </Route>
            </Switch>
        </div>
        {this.state.showTempSelected && <ShowTemEpisodesBCS 
              dataTempSelected={this.state.tempSelected}
              dataEpisodesDict={this.state.episodesBCS}/>}
      </div>
      
    )
  }
}

export default BetterCallSaul;
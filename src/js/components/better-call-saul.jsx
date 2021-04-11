import React, { Component } from 'react'
import axios from 'axios';
import '../../style/App.css';
import { BrowserRouter as Router, Switch, 
  Route, Link, useParams, useRouteMatch, withRouter } from "react-router-dom";
import EpisodiosBCS from './episodesBCS';


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
  state = {
    episodesBCS: [],
    nTempBCS: 0,
    tempBCS: [],
    episodeSelectedId: 0
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


  render() {
    return (
        <div class="row">
        { this.state.tempBCS.map(temp => 
        <div class="card w-25">
          <div class="card-body">
            <h4 class="card-title">Season {temp}</h4>
            <div class="dropdown">
              <a type="button" class="btn btn-info ">
                Check Out Episodes
              </a>
              <div class="dropdown-content">
                <ul>
                  { this.state.episodesBCS.filter(episode => episode.season == temp).map(filEpi => (
                    <li >
                      <Link id={filEpi.episode_id} className="nav-link" 
                      to={`/better-call-saul/episodes/${filEpi.episode_id}`}
                       onClick={(e) => this.setState({ episodeSelectedId: e.target.id }) }>
                        {filEpi.title} #{filEpi.episode}
                      </Link>
                    </li>
                  ))}
                  
                </ul>
              </div>
            </div>

          </div>
        </div>
        
          )}          
          <Switch>
            <Route path={`/better-call-saul/episodes/:episodeId`}>
              <EpisodiosBCS dataEpisodeId = {this.state.episodeSelectedId} />
            </Route>
          </Switch>
      </div>
      
    )
  }
}

export default BetterCallSaul;
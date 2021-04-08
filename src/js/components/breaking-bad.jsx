import React, { Component } from 'react'
import axios from 'axios';
import '../../style/index.css';
import { BrowserRouter as Router, Switch, 
  Route, Link, useParams, useRouteMatch, withRouter } from "react-router-dom";
import EpisodiosBB from './episodiosBB';
import ToggleBox from './toggleBox';


const countTemp = (episodesArray) => {
  var maxTemp = 0;
  episodesArray.forEach(function (episode) {
    if (parseInt(episode.season) > maxTemp) {
      maxTemp = parseInt(episode.season);
    }
    //console.log(maxTemp)
  });
  return maxTemp;
}


const assignTemp = (nTemps) => {
  var t_index;
  var tempArray = [];
  for (t_index = 1; t_index <= nTemps; t_index++) {
    //s_temp = "Temporada " + String(t_index)
    tempArray.push(t_index)
  }
  return tempArray;
}


class BreakingBad extends Component {
  state = {
    episodesBB: [],
    nTempBB: 0,
    tempBB: [],
    episodeSelectedId: 0,
    episodeSelected: false
    
  }

  async componentDidMount() {
    await axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad`)
      .then(res => {
        const episodesBB = res.data;
        this.setState({ episodesBB });
      })

    this.getTemps()
  }

  componentWillUnmount() {
    console.log('counter-unmount');
  } 

  getTemps = () => {
    // Asignar los nuevos valores y aplicar funciones
    const nTempBB = countTemp(this.state.episodesBB)
    this.setState({ nTempBB })

    const tempBB = assignTemp(this.state.nTempBB)
    this.setState({ tempBB })
  }

  handleEpisodeId = (e) => {
    const episodeSelectedId = e.target.id
    this.setState({ episodeSelectedId })
    this.setState({
      episodeSelected: !this.state.episodeSelected
    })
  }

  render() {

    return (
        <div class="row">
        { this.state.tempBB.map(temp => 
        <div class="card w-25">
          <div class="card-body">
            <h4 class="card-title">Season {temp}</h4>
            <div class="dropdown">
              <a type="button" class="btn btn-info ">
                Check Out Episodes
              </a>
              <div class="dropdown-content">
              
                <ul>
                  { this.state.episodesBB.filter(episode => episode.season == temp).map(filEpi => (
                    <li >
                      <Link id={filEpi.episode_id} className="nav-link" to={`/breaking-bad/episodes/${filEpi.episode_id}`} onClick={this.handleEpisodeId}>
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
            <Route path={`/breaking-bad/episodes/:episodeId`}>
              <EpisodiosBB dataEpisodeId = {this.state.episodeSelectedId} />
            </Route>
          </Switch>
      </div>
      
    )
  }
}

export default BreakingBad;

              // episode => {episode.season == temp}
              // <ul>
              //     { this.state.episodesBB.map(episode => <li>{episode.title}</li>)}
              // </ul>
              // <div className="col-sm-4">

              //   this.state.tempBB.map(temp => 
              //     <div className="card"> 
              //     <div className="card-body">
              //       <h5 class="card-title">{temp}
              //       </h5>

              //       <div className="btn-group dropend">
              //         <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              //           Dropdown button
              //         </button>
              //         <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              //           <li><a className="dropdown-item" href="#">Action</a></li>
              //           <li><a className="dropdown-item" href="#">Another action</a></li>
              //           <li><a className="dropdown-item" href="#">Something else here</a></li>
              //         </ul>
              //       </div>

              //     </div>
              //   </div>)}
              // </div> 
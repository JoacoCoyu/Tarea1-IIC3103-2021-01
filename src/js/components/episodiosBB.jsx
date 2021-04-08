import React, { Component } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Switch, 
  Route, Link, useParams, useRouteMatch, withRouter } from "react-router-dom";
import Character from './characters';
import SimpleTooltip from './popup';



class EpisodiosBB extends Component {
    state = {
        episodeSelectedId: 0,
        episodeSelected: [],
        chrNameSelected: ''
      }
    
      componentDidMount() {
        console.log("rendering episode component")
      }

      componentDidUpdate(prevProps, prevState) {
        if (prevState.episodeSelectedId != this.state.episodeSelectedId) {
          console.log("axios call")
          const Apirequest = "https://tarea-1-breaking-bad.herokuapp.com/api/episodes/"+this.state.episodeSelectedId+"?series=Breaking+Bad"
          axios.get(Apirequest)
            .then(res => {
              const episodeSelected = res.data;
              this.setState({ episodeSelected });
            })

        }
      }

      componentWillReceiveProps(nextProps) {
        this.setState({ episodeSelectedId: nextProps.dataEpisodeId });
      }

      handleChrName = (e) => {
        const chrNameSelected = e.target.id
        this.setState({ chrNameSelected })
        //console.log(this.state.chrNameSelected)
      }


      render() {
        return (
          <div className="episodes-container">
            
               { this.state.episodeSelected.map(episode =>
                <div className="card text-white bg-secondary mb-3 w-50">
                  <div className="card-header">
                    <h4>Episode Information</h4>
                    </div>

                  <div className="card-body-episodeInfo">
                    <div className="card-text">
                      Id: {episode.episode_id}
                      <br />
                      Title: {episode.title}
                      <br />
                      Season: {episode.season}
                      <br />
                      Episode: {episode.season}
                      <br />
                      Air Date: {episode.air_date}
                      <br />
                      Series: {episode.series}
                      <br />
                    </div>

                    <div className="card-text">
                      <h5>Characters</h5>
                      <ul>
                      {episode.characters.map(chr =>
                      
                      <li>
                        <Link id={chr} className="text-white" to={`/breaking-bad/episodes/character/${chr}`} onClick={this.handleChrName}>
                          {chr}
                        </Link>
                      </li>

                      )}
                      </ul>
                    </div>
                  </div>
                </div>
               )}

              <Switch>
                <Route path={`/breaking-bad/episodes/character/:chrName`}>
                  <Character dataChrName = {this.state.chrNameSelected} />
                </Route>
              </Switch>
          </div>

        );
      }
}
 
export default EpisodiosBB;
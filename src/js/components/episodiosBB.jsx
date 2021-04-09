import React, { Component } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Switch, 
  Route, Link, useParams, useRouteMatch, withRouter } from "react-router-dom";
import Character from './characters';

const editDate = (date) => {
  for (var chr_index = 0; chr_index < date.length; chr_index++) {
    if (date[chr_index] == "T") {
      var newDate = date.slice(0, chr_index-1);
    }
  }
  return newDate;
}


class EpisodiosBB extends Component {
    state = {
        episodeSelectedId: 1,
        episodeSelected: [],
        chrNameSelected: ''
      }
    
      componentDidMount() {
        const episodeSelectedId = 1;
        this.setState({ episodeSelectedId });
      }

      async componentDidUpdate(prevProps, prevState) {
        if (prevState.episodeSelectedId != this.state.episodeSelectedId) {
          const Apirequest = "https://tarea-1-breaking-bad.herokuapp.com/api/episodes/"+this.state.episodeSelectedId+"?series=Breaking+Bad"
          await axios.get(Apirequest)
            .then(res => {
              res.data[0].air_date = editDate(res.data[0].air_date)
              const episodeSelected = res.data;
              this.setState({ episodeSelected });
            })
        }
      }

      static getDerivedStateFromProps(props, state) {
        console.log("props", props.dataEpisodeId)
        console.log("funct", state.episodeSelectedId)
        if (props.dataEpisodeId !== state.episodeSelectedId) {
          return {
            episodeSelectedId: props.dataEpisodeId,
          };
        }
        return null;
      }

      handleChrName = (e) => {
        const chrNameSelected = e.target.id
        this.setState({ chrNameSelected })
        //console.log(this.state.chrNameSelected)
      }

      render() {
        console.log("rendering episode", this.state.episodeSelectedId)
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
                      Episode: {episode.episode}
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
                        <Link id={chr} 
                        className="text-white" to={`/breaking-bad/episodes/character/${chr}`} 
                        onClick={this.handleChrName}>
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
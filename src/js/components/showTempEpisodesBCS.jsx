import React, { Component } from 'react'
import '../../style/App.css';
import { BrowserRouter as Router, Switch, 
    Route, Link, useParams, useRouteMatch, withRouter } from "react-router-dom";
import axios from 'axios';


class ShowTemEpisodesBCS extends Component {

    constructor(props){
        super(props);
          this.state = {
            tempSelected: 0,
            episodesBCS: []
          }
    }

    async componentDidUpdate(prevProps, prevState) {
        // console.log("temp selected",this.state.tempSelected)
        // console.log("prevstate",prevState)
        if (prevState.episodeSelectedId != this.state.episodeSelectedId) {
            await axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Better+Call+Saul`)
            .then(res => {
              const episodesBCS = res.data;
              this.setState({ episodesBCS });
            })
        }
      }


    static getDerivedStateFromProps(props, state) {
        if (props.dataTempSelected !== state.tempSelected) {
          return {
            tempSelected: props.dataTempSelected,
            episodesBCS: props.dataEpisodesDict
          };
        }
        return null;
      }

    render() { 
        return ( 
                <div className="episode-main-dl-container">
                    <div class="episodes-dl-title">
                        <h5>This are the episodes of season {this.state.tempSelected[0]} of Better Call Saul</h5>
                    </div>
                    <div class="row row-cols-2 row-cols-lg-5 g-lg-2 justify-content-center">
                            { this.state.episodesBCS
                            .filter(episode => episode.season == this.state.tempSelected[0]).map(filEpi => (
                                <div class="col-episode-dl">
                                    <Link id={filEpi.episode_id}
                                    className="text-dark">
                                        {filEpi.episode}) {filEpi.title}
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
        
         );
    }
}
 
export default ShowTemEpisodesBCS;
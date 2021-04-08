import React, { Component } from 'react'
import axios from 'axios';


class EpisodiosBB extends Component {
    state = {
        episodeSelectedId: 0,
        episodeSelected: []
      }
    
      componentDidMount() {
        console.log("rendering episode component")
      }

      componentDidUpdate(prevProps, prevState) {
        console.log("prevState", prevState.episodeSelectedId)
        //console.log(this.state.episodeSelectedId)
        if (prevState.episodeSelectedId != this.state.episodeSelectedId) {
          console.log("axios call")
          const Apirequest = "https://tarea-1-breaking-bad.herokuapp.com/api/episodes/"+this.state.episodeSelectedId+"?series=Breaking+Bad"
          axios.get(Apirequest)
            .then(res => {
              const episodeSelected = res.data;
              this.setState({ episodeSelected });
            })

        }
        // const Apirequest = "https://tarea-1-breaking-bad.herokuapp.com/api/episodes/"+this.state.episodeSelectedId+"?series=Breaking+Bad"
        // axios.get(Apirequest)
        //   .then(res => {
        //     const episodeSelected = res.data;
        //     this.setState({ episodeSelected });
        //   })
        
      }

      componentWillReceiveProps(nextProps) {
        this.setState({ episodeSelectedId: nextProps.dataEpisodeId });
      }

      // updateEpisodeId = () => {
      //   const episodeSelectedId = this.props.dataEpisodeId
      //   this.setState({ episodeSelectedId })

      // }

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
                      <li> {chr} </li>
                      )}
                      </ul>
                    </div>
                  </div>
                </div>
               )}
        
          </div>

        )
      }
}
 
export default EpisodiosBB;
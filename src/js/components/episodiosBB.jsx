import React, { Component } from 'react'
import axios from 'axios';


class Episodios extends Component {
    state = {
        episodes: []
      }
    
      componentDidMount() {
        axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=Breaking+Bad`)
          .then(res => {
            const episodes = res.data;
            this.setState({ episodes });
          })
      }
    
      render() {
        console.log(this.state.episodes)
        return (
          <ul>
            { this.state.episodes.map(episode => <li>{episode.title}</li>)}
          </ul>
        )
      }
}
 
export default Episodios;
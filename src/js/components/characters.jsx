import React, { Component } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from "reactjs-popup";
import '../../style/App.css';
import { BrowserRouter as Router, Switch, 
  Route, Link, useParams, useRouteMatch, withRouter } from "react-router-dom";


const addComas = (array) => {
  for (var e_index = 0; e_index < array.length; e_index++) {
    if (e_index != (array.length - 1)) {
      array[e_index] = array[e_index] + ","
    }
  }
  return array;
}

class Character extends Component {

    state = { 
        chrNameSelected: 'noName',
        chrSelected: [],
        quoteSelected: []
     }

    async componentDidUpdate(prevProps, prevState) {
        
        if (prevState.chrNameSelected != this.state.chrNameSelected) {
          // BREAKING BAD
          const Apirequest = "https://tarea-1-breaking-bad.herokuapp.com/api/characters?name="+this.state.chrNameSelected
          await axios.get(Apirequest)
            .then(res => {
              res.data.occupation = addComas(res.data[0].occupation)
              res.data.appearance = addComas(res.data[0].appearance)
              res.data.better_call_saul_appearance = addComas(res.data[0].better_call_saul_appearance)
              const chrSelected = res.data;
              this.setState({ chrSelected });
            })

          const Apirequest1 = "https://tarea-1-breaking-bad.herokuapp.com/api/quote?author="+this.state.chrNameSelected
          axios.get(Apirequest1)
            .then(res => {
              const quoteSelected = res.data;
              this.setState({ quoteSelected });
            })

        }
      }

    static getDerivedStateFromProps(props, state) {
      var newName = props.dataChrName.replace(" ", "+");
      if (props.dataChrName !== state.chrNameSelected) {
        return {
          chrNameSelected: newName,
        };
      }
      return null;
    }


    handleTempBB = (e) =>  {
      var tempSel = ""
      var seriesSel = ""
      for (var index = 0; index < e.target.id.length; index++) {
        if (e.target.id[index] == "-") {
          tempSel = e.target.id.slice(0, index)
          seriesSel = e.target.id.slice(index+1, e.target.id.length)
        }
      }
      const childTempData = [tempSel, seriesSel]
      this.props.parentCallback(childTempData);
    }

    handleTempBCS = (e) =>  {
      var tempSel = ""
      var seriesSel = ""
      for (var index = 0; index < e.target.id.length; index++) {
        if (e.target.id[index] == "-") {
          tempSel = e.target.id.slice(0, index)
          seriesSel = e.target.id.slice(index+1, e.target.id.length)
        }
      }
      const childTempData = [tempSel, seriesSel]
      this.props.parentCallback(childTempData);
    }

    render() {
        console.log("rendering character")
        return ( 
                <div className="chr-container">
                  { this.state.chrSelected.map(chr => 
                    <div className="chr-info-container">
                      <div className="char-img">
                        <img src={chr.img} alt="Avatar" className="card-img-top" />
                      </div>
                      <div class="chr-text-container">
                        <div className="chr-season-p">
                            <h4 className="text-white">
                            {chr.name}
                            </h4>

                            <Popup
                              trigger={<button className="btn btn-warning quote-btn">See Quotes</button>}
                              position="right"
                              closeOnDocumentClick>
                                <div className="quote-container">
                                  {this.state.quoteSelected.filter(quote =>
                                    quote.quote != "").map(contQuote => 
                                      <ul>
                                        <li>{contQuote.quote}</li>
                                      </ul>

                                    )}
                                </div>
                            </Popup>

                          </div>
                          <p className="chr-text-p text-white">
                            <b>Nickname:</b> {chr.nickname}
                            <br />
                            <b>Id:</b> {chr.char_id}
                            <br />
                            <b>Birthday:</b> {chr.birthday}
                            <br />
                            <b>Occupation:</b> {chr.occupation.map(occup =>
                              <div className="chr-season-p">
                                <a>{occup}</a>
                              </div>
                              )}
                            <br />
                            <b>Status:</b> {chr.status}
                            <br />
                            <b>Season's appearance Breaking Bad:</b> {chr.appearance.map(season =>
                              <div className="chr-season-p">
                                <Link to="/breaking-bad"
                                id={season+"-bb"}
                                onClick={this.handleTempBB}>
                                  {season}
                                </Link>
                              </div>
                              )}
                              <br />
                            <b>Season's appearance Better Call Saul:</b> {chr.better_call_saul_appearance.map(season =>
                              <div className="chr-season-p">
                                <Link to="/better-call-saul"
                                id={season+"-bcs"}
                                onClick={this.handleTempBCS}>
                                  {season}
                                </Link>
                              </div>
                              )}
                            <br />
                            <b>Portrayed:</b> {chr.portrayed}
                          </p>
                      </div>
                      </div>
                  )}
                </div>
         );
    }
}
 
export default Character;
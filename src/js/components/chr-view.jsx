import React, { Component } from 'react'
import Character from "./characters"
import axios from 'axios';
import '../../style/App.css';
import Popup from "reactjs-popup";
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

class ChrView extends Component {
    constructor(props){
        super(props);
          this.state = {
            chrNameSelected: "",
            chrSelected: [],
            quoteSelected: []
          }
      }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.chrNameSelected != this.state.chrNameSelected) {
            const Apirequest = "https://tarea-1-breaking-bad.herokuapp.com/api/characters?name="+this.state.chrNameSelected
            await axios.get(Apirequest)
              .then(res => {
                res.data.occupation = addComas(res.data[0].occupation)
                res.data.appearance = addComas(res.data[0].appearance)
                res.data.better_call_saul_appearance = addComas(res.data[0].better_call_saul_appearance)
                this.setState({ chrSelected: res.data });
              })

            const Apirequest1 = "https://tarea-1-breaking-bad.herokuapp.com/api/quote?author="+this.state.chrNameSelected
            await axios.get(Apirequest1)
            .then(res => {
                const quoteSelected = res.data;
                this.setState({ quoteSelected });
            })
        }
    }


    static getDerivedStateFromProps(props, state) {
        var chrNameSel = props.searchNameValue.replace(" ", "+");
        if (props.searchName !== state.chrNameSelected) {
            return {
            chrNameSelected: chrNameSel,
            };
        }
        return null;
    }

    
    render() { 
        console.log("rendering selected char")
        return (
            <div class="s-chr-container">
                {this.state.chrSelected.map(chr =>
                <div className="s-chr-info-container">
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
                            <div>
                                <a>{occup}</a>
                            </div>
                            )}
                            <br />
                            <b>Status:</b> {chr.status}
                            <br />
                            <b>Portrayed:</b> {chr.portrayed}
                            <br />
                            <b>Season's appearance Breaking Bad:</b> {chr.appearance.map(season =>
                            <div className="chr-season-p">
                                <a>
                                {season}
                                </a>
                            </div>
                            )}
                            <br />
                            <b>Season's appearance Better Call Saul:</b> {chr.better_call_saul_appearance.map(season =>
                            <div className="chr-season-p">
                                <a>
                                {season}
                                </a>
                            </div>
                            )}
                            <br />
                            <b>Categories of the character: </b>
                              <div className="chr-season-p">
                                <a>
                                  {chr.category}
                                </a>
                              </div>
                        </p>
                        </div>
                    </div>
                    )}
                </div>
         );
    }
}
 
export default ChrView;
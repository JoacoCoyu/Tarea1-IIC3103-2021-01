import React, { Component } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from "reactjs-popup";


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

    componentDidUpdate(prevProps, prevState) {
        
        if (prevState.chrNameSelected != this.state.chrNameSelected) {
          console.log("chr axios call")
          const Apirequest = "https://tarea-1-breaking-bad.herokuapp.com/api/characters?name="+this.state.chrNameSelected
          axios.get(Apirequest)
            .then(res => {
              res.data.occupation = addComas(res.data[0].occupation)
              res.data.appearance = addComas(res.data[0].appearance)
              const chrSelected = res.data;
              this.setState({ chrSelected });
            })

          const Apirequest1 = "https://tarea-1-breaking-bad.herokuapp.com/api/quote?author="+this.state.chrNameSelected
          axios.get(Apirequest1)
            .then(res => {
              const quoteSelected = res.data;
              this.setState({ quoteSelected });
              console.log(quoteSelected)
            })

        }
      }

    componentWillReceiveProps(nextProps) {
        var newName = nextProps.dataChrName.replace(" ", "+");
        this.setState({ chrNameSelected: newName });
        console.log(this.state.chrNameSelected)
      }

    render() { 
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
                                {this.state.quoteSelected.map(quote =>
                                    <ul>
                                      <li>{quote.quote}</li>
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
                            <b>Season's appearance:</b> {chr.appearance.map(season =>
                              <div className="chr-season-p">
                                <a>{season}</a>
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




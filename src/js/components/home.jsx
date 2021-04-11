import React, { Component } from 'react'
import '../../style/App.css';
import bbPicture from "../../img/bb.jpg";
import bcsPicture from "../../img/bcs.jpg";



class Home extends Component {
    
    render() { 
        return ( 
            <div className="home-container">
                <div className="home-text">
                    <br /><br /><br />
                    <h2>Welcome to the Series B&B App</h2>
                    <p>En esta aplicación podrás saber todo acerca de las temporadas, episodios y personajes
                        de las series Breaking Bad y Better Call Saul.
                    </p>
                </div>

                <div className="home-img">
                    <div class="bb-main-pic">
                        <img src={bbPicture} alt="Breaking Bad picture" className="bb-picture" />
                    </div>

                    <div className="bcs-main-pic">
                        <img src={bcsPicture} alt="Breaking Bad picture" className="bcs-picture" />
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Home;
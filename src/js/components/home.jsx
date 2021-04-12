import React, { Component } from 'react'
import '../../style/App.css';
import bbPicture from "../../img/bb.jpg";
import bcsPicture from "../../img/bcs.jpg";
import { BrowserRouter as Router, Link, Switch, Route, useParams, useRouteMatch } from "react-router-dom";




class Home extends Component {
    
    render() { 
        return ( 
            <div className="home-container">
                <div className="home-text">
                    <br /><br /><br />
                    <h2>Bienvenido a la App Series B&B</h2>
                    <p>En esta aplicación podrás saber todo acerca de las temporadas, episodios y personajes
                        de las series Breaking Bad y Better Call Saul. Utiliza la barra de navegación para probar las 
                        distintas funcionalidades de la aplicación incluyendo buscar directamente a tus personajes favoritos.
                        
                        <br /><br />
                        <b>Consideraciones</b>
                        <br />
                        Un detalle a considerar para interactuar con la aplicación, es que tuve pequeñas complicaciones 
                        para controlar completamente los eventos 
                        de los clicks, por lo que si es que te llega a ocurrir que presionando un episodio o un personaje no 
                        aparece nada de inmediato, 
                        te recomiendo presionar otro elemento del mismo tipo y se mostrará la información.
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
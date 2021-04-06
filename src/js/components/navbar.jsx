import React, { Component } from 'react';
import '../../style/App.css';
import { Link } from "react-router-dom";

class NavBar extends Component {

    render() { 
        return ( 
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">Navbar
                        </span>
                    
                    <div class="collapse navbar-collapse" id="navbarNav">

                        {/* AQUI CAMBIAR LOS LINKS */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/breaking-bad">Breaking Bad</Link>
                            </li>
                        </ul>

                    </div>

                </div>
            </nav>
         );
    }
}
 
export default NavBar;

import React, { Component } from 'react';
import '../../style/App.css';
import { Link } from "react-router-dom";

class NavBar extends Component {

    state = {
        searchValue: "pre Value"
      }

    async componentDidUpdate(prevProps, prevState) {
        console.log("hola actualizando")
      }
    
    handleSearchValue = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    printValue = () => {
        console.log(this.state.searchValue)
    }
    

    render() { 
        return ( 
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1">T1 Series App
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

                        <form class="d-flex">
                            <input id="searchValue" class="form-control me-2" 
                            type="search" placeholder="Search" aria-label="Search" 
                            onChange={this.handleSearchValue} />
                            
                            <button class="btn btn-outline-success" type="button"
                            onClick={this.printValue}>Search</button>
                        </form>

                    </div>
                </div>
            </nav>
         );
    }
}
 
export default NavBar;

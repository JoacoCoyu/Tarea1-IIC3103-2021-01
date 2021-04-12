import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../style/autocomplete.css';
import Auto from "./autocomplete"


class NavBar extends Component {

    constructor(props){
    super(props);
        this.state = {
            searchValue: "pre Value",
            searchChr: [],
            inputRef: React.createRef()
        }
    }
    
    async componentDidUpdate(prevProps, prevState) {
        if (prevState.searchValue != this.state.searchValue) {
            await axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=Walter`)
            .then(res => {
                const searchChr = res.data;
                this.setState({ searchChr });
            })
        }
    }

    handleSearchValue = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    printValue = () => {
        console.log(this.state.searchValue)
        console.log(this.state.searchChr)
    }

    handleSearchName = (childData) => {
        this.props.searchNameCallback(childData)
    }

    render() { 
        return ( 
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">T1 Series App</span>
                    
                    <div class="collapse navbar-collapse" id="navbarNav">

                        {/* AQUI CAMBIAR LOS LINKS */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/breaking-bad">Breaking Bad</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/better-call-saul">Better Call Saul</Link>
                            </li>
                        </ul>
                     
                        <Auto 
                        searchNameCallback={this.handleSearchName} />
                    
                    </div>
                </div>
            </nav>
         );
    }
}
 
export default NavBar;

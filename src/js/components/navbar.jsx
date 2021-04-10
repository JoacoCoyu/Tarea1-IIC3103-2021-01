import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../style/autocomplete.css';
import Auto from "./autocomplete"



class NavBar extends Component {

    state = {
        searchValue: "pre Value",
        searchChr: [],
        testDict: ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"],
        inputRef: React.createRef()
        
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

    render() { 
        return ( 
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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

                        {/* <form class="d-flex">
                            <input id="searchValue" class="form-control me-2" 
                            type="search" placeholder="Search" aria-label="Search" 
                            onChange={this.handleSearchValue} />
                            <button class="btn btn-outline-success" type="button"
                            onClick={this.printValue}>Search</button>
                        </form> */}
                     
                        <Auto />
                           
                    

                    </div>
                </div>
            </nav>
         );
    }
}
 
export default NavBar;

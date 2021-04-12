import React, { useEffect, useState, useRef } from "react";
import '../../style/autocomplete.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, 
    Route, Link, useParams, useRouteMatch, withRouter } from "react-router-dom";
import Character from './characters';


const Auto = (props) => {
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    let [chr, setChr] = useState([]);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);
    let [chosenChr, setChosen] = useState("");
  
    useEffect(() => {
      const pokemon = [];
      const promises = new Array(20)
        // .fill()
        // .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`));
        // Promise.all(promises).then(pokemonArr => {
        //     return pokemonArr.map(value =>
        //     value
        //         .json()
        //         .then(({ name, sprites: { front_default: sprite } }) =>
        //         pokemon.push({ name, sprite })
        //         )
        //     );
        // });
        // setOptions(pokemon);
        // console.log(pokemon)

        axios.get(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?limit=20&offset=0`)
            .then( response => setChr(response.data) )
            console.log(chr)
    }, []);
  
    useEffect(() => {
      window.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("mousedown", handleClickOutside);
      };
    });
  
    const handleClickOutside = event => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(event.target)) {
        setDisplay(false);
      }
    };
  
    const updatePokeDex = poke => {
      setSearch(poke);
      setDisplay(false);
    };

    const getSearchName = name => {
      props.searchNameCallback(name);

    }
  
    return (
      <div ref={wrapperRef} className="flex-container flex-column pos-rel">
        <input
          id="auto"
          className="form-control me-2"
          onClick={() => setDisplay(!display)}
          placeholder="Type to search a character"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        {display && (
          <div className="autoContainer">
            {chr
              .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
              .map((value, i) => {
                return (
                  <div
                    onClick={() => updatePokeDex(value.name)}
                    className="option"
                    key={i}
                    tabIndex="0"
                  >
                    <Link 
                    to="/character-search"
                    onClick={() => getSearchName(value.name)}>
                        {value.name}
                    </Link>
                  </div>
                );
              })}
          </div>
        )}
        {/* <div className="search-chr">
          <Switch>
            <Route path={`/character/:chrName`}>
                <Character dataChrName = {search} />
            </Route>
          </Switch>
        </div> */}

      </div>
    );
};

export default Auto;




import React, { useEffect, useState, useRef } from "react";
import '../../style/autocomplete.css';
import { BrowserRouter as Router, Switch, 
    Route, Link, useParams, useRouteMatch, withRouter } from "react-router-dom";


const EpisodeDropdownBB = (props) => {
    const [display, setDisplay] = useState(false);
    let [episodes, setEpisodes] = useState([]);
    let [temp, setTemp] = useState("");
    let [episodeId, setEpisodeId] = useState(0);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);
  
    useEffect(() => {
        setEpisodes(props.dataEpisodeDict)
        setTemp(props.dataTemp)
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
  
    const updateEpisodeId = episodeId => {
        setEpisodeId(episodeId);
        props.parentCallback(episodeId);
        setDisplay(false);
    };
  
    return (
            <div ref={wrapperRef} className="flex-container flex-column pos-rel">
                <div className="dropdown-btn">
                    <button
                    id="auto"
                    className="btn btn-info"
                    onClick={() => setDisplay(!display)}
                    placeholder="Type to search a character"
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                    >Check Out Episodes
                    </button>
                    {display && (
                    <div className="dd-episode-container">
                        { episodes
                        .filter(episode => episode.season == temp).map(filEpi => (
                            <div className="episode-element">
                                <li>
                                    <Link id={filEpi.episode_id}
                                    className="text-dark"
                                    to={`/breaking-bad/episodes/${filEpi.episode_id}`}
                                    onClick={() => updateEpisodeId(filEpi.episode_id)}>
                                        {filEpi.episode}) {filEpi.title}
                                    </Link>
                                </li>
                            </div>
                        ))}
                    </div>
                    )}
                </div> 
            </div>
    );
};

export default EpisodeDropdownBB;
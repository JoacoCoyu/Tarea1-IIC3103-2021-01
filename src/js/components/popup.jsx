import React from "react";
import Warper from "./warper";
import Popup from "reactjs-popup";
import Character from './characters';

//

const SimpleTooltip = () => (
  <Popup
    trigger={open => (
      <button className="button">Trigger - {open ? "Opened" : "Closed"}</button>
    )}
    position="left center"
    closeOnDocumentClick
  >
    {/* <span> Popup content </span> */}
    <span>
        <div>
        <Character dataChrName = "Walter White" />
        </div>
    </span>
  </Popup>
);

export default Warper(SimpleTooltip);
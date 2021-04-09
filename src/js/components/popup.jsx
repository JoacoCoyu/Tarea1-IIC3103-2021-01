import React from "react";
import Warper from "./warper";
import Popup from "reactjs-popup";
import Character from './characters';

//

const QuoteTooltip = () => (
  <Popup
    trigger={open => (
      <button className="quote-btn">See Quotes</button>
    )}
    position="right"
    closeOnDocumentClick
  >
    {/* <span> Popup content </span> */}
    <span>
        <div>
        <p>This is a quote</p>
        </div>
    </span>
  </Popup>
);

export default Warper(QuoteTooltip);
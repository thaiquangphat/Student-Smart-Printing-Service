import React from "react";
import "./popup.styles.css";
import exit from "../../assets/exit.svg";

const Popup = (props) => {
  const { openPopup, closeBtn } = props;
  return (
    <div className="popup-background">
      <div className="popup-container">
        {props.children}
        <div className="close-btn-container">
          {closeBtn && (
            <button className="close-btn" onClick={() => openPopup(false)}>
              <img src={exit} alt="Exit" className="Exit" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;

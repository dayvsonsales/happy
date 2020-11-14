import React from "react";

import "./styles.css";

import doneIcon from "../../../assets/images/done-icon.svg";

const Done: React.FC<{
  alertMessage: string;
  alertButtonMessage: string;
  callback: any;
}> = ({ alertMessage, alertButtonMessage, callback = () => {} }) => {
  return (
    <div className="container-delete">
      <div className="message-container">
        <p className="title">Ebaa!</p>
        <p className="subtitle">{alertMessage}</p>
        <button onClick={(e) => callback(e)}>{alertButtonMessage}</button>
      </div>
      <div>
        <img className="icon" src={doneIcon} alt="Done" />
      </div>
    </div>
  );
};

export default Done;

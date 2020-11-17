import React from "react";

import doneIcon from "../../../assets/images/done-icon.svg";

import "./styles.css";

const Done: React.FC<{
  alertMessage: string;
  alertButtonMessage: string;
  callback: any;
}> = ({ alertMessage, alertButtonMessage, callback = () => {} }) => {
  return (
    <div className="container-done">
      <div className="message-container-done">
        <p className="title-done">Ebaa!</p>
        <p className="subtitle-done">{alertMessage}</p>
        <button onClick={(e) => callback(e)}>{alertButtonMessage}</button>
      </div>
      <div>
        <img className="icon-done" src={doneIcon} alt="Done" />
      </div>
    </div>
  );
};

export default Done;

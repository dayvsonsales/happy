import React from "react";

import "./styles.css";

import doneIcon from "../../../assets/images/done-icon.svg";

const Done: React.FC = () => {
  return (
    <div className="container-delete">
      <div className="message-container">
        <p className="title">Ebaa!</p>
        <p className="subtitle">
          O cadastro deu certo e foi enviado ao administrador para ser aprovado.
          Agora é só esperar :)
        </p>
        <button>Voltar para o mapa</button>
      </div>
      <div>
        <img className="icon" src={doneIcon} alt="Done" />
      </div>
    </div>
  );
};

export default Done;

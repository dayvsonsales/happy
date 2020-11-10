import React from "react";

import "./styles.css";

import deleteIcon from "../../../assets/images/delete-icon.svg";

const Delete: React.FC = () => {
  return (
    <div className="container-delete">
      <div className="message-container">
        <p className="title">Excluir!</p>
        <p className="subtitle">
          Você tem certeza que quer excluir Orf. Esperança?
        </p>
        <button>Sim</button>
        <button>Voltar para tela anterior</button>
      </div>
      <div>
        <img className="icon" src={deleteIcon} alt="Delete" />
      </div>
    </div>
  );
};

export default Delete;

import React from "react";

import "../styles.css";

import arrow from "../../../assets/images/arrow.svg";

const RequestReset: React.FC = () => {
  return (
    <div className="container-auth">
      <div className="back-button-auth">
        <img src={arrow} alt="voltar" />
      </div>
      <h3 className="title-auth">Esqueci a senha</h3>
      <h2 className="subtitle-auth">
        Sua redefinição de senha será enviada para o e-mail cadastrado.
      </h2>
      <div className="form-auth">
        <label>E-mail</label>
        <input type="email" name="email" />
      </div>

      <button>Solicitar</button>
    </div>
  );
};

export default RequestReset;

import React from "react";

import "../styles.css";

import arrow from "../../../assets/images/arrow.svg";

const Login: React.FC = () => {
  return (
    <div className="container-auth">
      <div className="back-button-auth">
        <img src={arrow} alt="voltar" />
      </div>
      <h3 className="title-auth">Fazer login</h3>
      <div className="form-auth">
        <label>E-mail</label>
        <input type="email" name="email" />
        <label>Senha</label>
        <input type="email" name="email" />
      </div>
      <div className="bottom-form-auth">
        <div className="remember">
          <input type="checkbox" name="remember" />
          Lembrar-me
        </div>
        <a href="#a">Esqueci minha senha</a>
      </div>
      <button>Entrar</button>
    </div>
  );
};

export default Login;

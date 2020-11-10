import React from "react";

import "../styles.css";

const ResetPassword: React.FC = () => {
  return (
    <div className="container-auth">
      <h3 className="title-auth">Redefinição de senha</h3>
      <h2 className="subtitle-auth">
        Escolha uma nova senha para você acessar o dashboard do Happy
      </h2>
      <div className="form-auth">
        <label>Nova senha</label>
        <input type="password" name="password" />

        <label>Repetir senha</label>
        <input type="password" name="confirm-password" />
      </div>

      <button>Redefinir senha</button>
    </div>
  );
};

export default ResetPassword;

import React, { FormEvent, useState } from "react";

import "../styles.css";

import arrow from "../../../assets/images/arrow.svg";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";

const RequestReset: React.FC = () => {
  const { requestResetPassword } = useUserContext();

  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    requestResetPassword({ email })
      .then(() => setSuccess(true))
      .catch(() => setError(true));
  }

  return (
    <div className="container-auth">
      <div className="back-button-auth" onClick={() => history.push("/login")}>
        <img src={arrow} alt="voltar" />
      </div>
      <h3 className="title-auth">Esqueci a senha</h3>
      <h2 className="subtitle-auth">
        Sua redefinição de senha será enviada para o e-mail cadastrado.
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-auth">
          <label>E-mail</label>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={() => setEmail}
          />
          {error && <div className="error">Erro ao solicitar!</div>}
          {success && (
            <div className="success">
              Se esse e-mail estiver cadastrado, enviaremos o link para resetar
              sua senha!
            </div>
          )}
        </div>

        <button type="submit">Solicitar</button>
      </form>
    </div>
  );
};

export default RequestReset;

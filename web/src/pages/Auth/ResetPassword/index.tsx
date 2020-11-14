import React, { FormEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";

import "../styles.css";

interface Params {
  token: string;
}

const ResetPassword: React.FC = () => {
  const history = useHistory();

  const { resetPassword } = useUserContext();

  const { token } = useParams<Params>();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [error, setError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError(true);
      return false;
    }

    resetPassword({ token, password })
      .then(() => history.push("/login"))
      .catch(() => setError(true));
  }

  return (
    <div className="container-auth">
      <h3 className="title-auth">Redefinição de senha</h3>
      <h2 className="subtitle-auth">
        Escolha uma nova senha para você acessar o dashboard do Happy
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-auth">
          <label>Nova senha</label>
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Repetir senha</label>
          <input
            required
            type="password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordError && (
            <div className="error">As senhas não são iguais.</div>
          )}
        </div>

        {error && (
          <div className="error">Não foi possível redefinir sua senha!</div>
        )}

        <button type="submit">Redefinir senha</button>
      </form>
    </div>
  );
};

export default ResetPassword;

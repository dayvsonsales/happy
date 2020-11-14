import React, { FormEvent, useState } from "react";

import "../styles.css";

import { useUserContext } from "../../../contexts/UserContext";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useUserContext();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (email && password) {
      login({ email, password, remember }).catch((_) => setError(true));
    }

    return false;
  }

  return (
    <>
      <div className="container-auth">
        <h3 className="title-auth">Fazer login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-auth">
            <label>E-mail</label>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Senha</label>
            <input
              required
              type="password"
              name="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error">Usuário ou senha inválidos!</div>}
          <div className="bottom-form-auth">
            <div className="remember">
              <input
                type="checkbox"
                name="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Lembrar-me
            </div>
            <Link to="/request-reset">Esqueci minha senha</Link>
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </>
  );
};

export default Login;

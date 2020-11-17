import React, { useState } from "react";

import "./styles.css";

import deleteIcon from "../../../assets/images/delete-icon.svg";
import api from "../../../services/api";

const Delete: React.FC<{ id: number; callback(): void }> = ({
  id,
  callback,
}) => {
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  async function handleDelete() {
    try {
      await api.delete(`/orphanages/${id}`);
      setSuccess(true);
    } catch (_) {
      setError(true);
    }
  }

  return (
    <div className="container-delete">
      <div className="message-container">
        <p className="title">Excluir!</p>
        <p className="subtitle">
          Você tem certeza que quer excluir Orf. Esperança?
        </p>
        {error && (
          <div className="error">
            Aconteceu um erro ao tentar excluir o orfanato!
          </div>
        )}
        {success ? (
          <div className="success">Orfanato excluído com sucesso!</div>
        ) : (
          <button onClick={() => handleDelete()}>Sim</button>
        )}

        <button onClick={() => callback()}>Voltar para tela anterior</button>
      </div>
      <div>
        <img className="icon" src={deleteIcon} alt="Delete" />
      </div>
    </div>
  );
};

export default Delete;

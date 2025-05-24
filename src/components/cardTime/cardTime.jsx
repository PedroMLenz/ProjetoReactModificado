// CardTime.js
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cardTime.less";
import Button from "../Button/button";
import { TimesContext } from "../../context/TimesProvider";

function CardTime({ time }) {
  const navigate = useNavigate();
  const { deleteTime } = useContext(TimesContext);

  const handleDelete = async () => {
    console.log("handleDelete called"); // Log para depuração
    if (window.confirm("Tem certeza que deseja excluir este time?")) {
      const success = await deleteTime(time.id);
      if (success) {
        alert("Team deleted successfully");
      } else {
        alert("Failed to delete team");
      }
    }
  };

  const handleEdit = () => {
    console.log("handleEdit called"); // Log para depuração
    navigate(`/editar-Time/${time.id}`);
  };

  return (
    <div
      className="card"
      style={{ borderTop: `1.5rem solid ${time.cor}` }}
      key={time.id}
    >
      <h2 style={{ color: time.cor }}>{time.nome}</h2>
      <p>{time.descricao}</p>
      <div className="button-container">
        <Button className="button-card" text="Editar" onClick={handleEdit} />
        <Button className="button-card" text="Excluir" onClick={handleDelete} />
      </div>
    </div>
  );
}

export default CardTime;

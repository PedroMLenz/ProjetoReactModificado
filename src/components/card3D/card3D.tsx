import React from "react";
import ThreeScene from "../ThreeJS/ThreeScene"; // seu componente 3D do cubo/modelo
import "./card3D.css";

const Card = () => {
  return (
    <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
      <div
        style={{ position: "absolute", top: 20, left: 0, right: 0, bottom: 0 }}
      >
        <ThreeScene />
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 10,
          color: "#fff",
          padding: "40px",
        }}
      >
        <h1 className="text-2xl font-bold mb-4 animate-slide-fade">
          Bola de futebol 3D
        </h1>
        <p className="my-4">Interaja com o modelo diretamente na página.</p>
      </div>
    </div>
  );
};

export default Card;

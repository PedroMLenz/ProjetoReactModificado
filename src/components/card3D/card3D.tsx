import React from "react";
import ThreeScene from "../ThreeJS/ThreeScene";
import "./card3D.css";

const Card = () => {
  return (
    <>
      <div
        style={{ position: "relative", height: "500px", overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          <ThreeScene />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            color: "#fff",
            padding: "20px", // padding reduzido
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            maxWidth: "400px",
            borderRadius: "8px",
            margin: "20px",
            fontFamily: "Arial, sans-serif",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          <p className="my-4" style={{ lineHeight: "1.5", padding: "0" }}>
            Interaja com o modelo usando o mouse para girar a câmera.
            <br />
            Use as teclas <b>W, A, S, D, Q, E</b> para mover a bola no espaço.
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;

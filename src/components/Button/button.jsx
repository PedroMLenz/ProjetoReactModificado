import "./button.less";
import React from "react";

function Button({ text, onClick, type }) {

  const handleClick = (e) => {
    console.log('Button clicked', text); // Log para depuração
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button type={type} className="btn-75" onClick={handleClick}>{text}</button>
  );
}

export default Button;


import React from 'react';
import "./input.less";

const Input = React.forwardRef(({ type, id, value, onChange, ariaLabel, ariaRequired, placeholder }, ref) => (
  <>
    {id && <label htmlFor={id}>{id.charAt(0).toUpperCase() + id.slice(1)}</label>}
    <input
      ref={ref}
      className="input"
      type={type}
      id={id}
      required
      value={value}
      onChange={onChange}
      aria-label={ariaLabel}
      aria-required={ariaRequired}
      placeholder={placeholder}
    />
  </>
));

export default Input;
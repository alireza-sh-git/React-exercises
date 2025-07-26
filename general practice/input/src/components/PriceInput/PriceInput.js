import { useState } from "react";

const formatter = new Intl.NumberFormat("en-US");

function PriceInput({ id, value, onChange, label }) {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? formatter.format(value) : internalValue;

  function handleChange(e) {
    let rawValue = e.target.value;
    rawValue = rawValue.replace(/[۰-۹]/g, (d) =>
      String.fromCharCode(d.charCodeAt(0) - 1728)
    );
    rawValue = rawValue.replace(/\D/g, "");
    const newValue = rawValue === "" ? "" : Number(rawValue);
    const formattedValue = newValue === "" ? "" : formatter.format(newValue);
    setInternalValue(formattedValue);
    if (onChange) onChange(newValue);
  }

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input type="text" id={id} value={currentValue} onChange={handleChange} />
    </div>
  );
}

export default PriceInput;

// Custom Price Input which can be used as both uncontrolled and controlled input.

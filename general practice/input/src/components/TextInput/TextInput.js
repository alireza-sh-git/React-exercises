import { useState } from "react";

function TextInput({ id, value, onChange, label }) {
  const [internalValue, setInternalValue] = useState(value || "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  function handleChange(e) {
    const newValue = e.target.value;
    if (!isControlled) setInternalValue(newValue);
    if (onChange) onChange(newValue);
  }

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input type="text" id={id} value={currentValue} onChange={handleChange} />
    </div>
  );
}

export default TextInput;

// Custom Input which can be used as both uncontrolled and controlled input.

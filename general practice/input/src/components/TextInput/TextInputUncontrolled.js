import { useState } from "react";

function TextInput({ id, label }) {
  const [internalValue, setInternalValue] = useState("");

  function handleChange(e) {
    const newValue = e.target.value;
    setInternalValue(newValue);
  }

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type="text"
        id={id}
        value={internalValue}
        onChange={handleChange}
      />
    </div>
  );
}

export default TextInput;

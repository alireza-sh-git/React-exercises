function TextInput({ id, value, onChange, label }) {
  function handleChange(e) {
    const newValue = e.target.value;
    if (onChange) onChange(newValue);
  }

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input type="text" id={id} value={value} onChange={handleChange} />
    </div>
  );
}

export default TextInput;

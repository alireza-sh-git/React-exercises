import { useState } from "react";

import PriceInput from "./components/PriceInput/PriceInput";

function App() {
  const [testInput, setTestInput] = useState("1234");
  function handleSubmit(e) {
    e.preventDefault();
    console.log(testInput);
  }
  return (
    <form className="App" onSubmit={handleSubmit}>
      <PriceInput id={"test"} value={testInput} onChange={setTestInput} />
      <button type="submit">submit</button>
    </form>
  );
}

export default App;

import { useState } from "react"

const Field = ({ name, value, ...props }) => {
  const [state, setState] = useState(value || "");

  return <input name={name} value={state} onChange={(e) => setState(e.target.value)} { ...props } />
}

export default Field;
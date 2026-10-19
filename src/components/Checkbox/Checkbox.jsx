import { useId } from "react";
import "./Checkbox.css";

export default function Checkbox({ label, checked, onChange }) {
  const id = useId();
  return (
    <label className="check" htmlFor={id}>
      {/* Native input hidden; check-box span is the visual indicator */}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="check-box" aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}

import { useState } from "react";
import { BudgetItemProtocol } from "./protocols/budget-item-protocol";

export default function BudgetItem(props: BudgetItemProtocol) {
  const [description, setDescription] = useState(props.description);
  const [value, setValue] = useState(props.value);
  const [status, setStatus] = useState(props.status);

  const toggleButton = () => {
    setStatus((document.querySelector("#" + props.id) as HTMLInputElement).checked ? "done" : "pending");
  };

  return (
    <li className={"budget-item item-status-" + status}>
      <div className="description">{description}</div>
      <div className="value">{value}</div>
      <input type="checkbox" id={props.id} onChange={toggleButton} checked={status === "done"} />
    </li>
  );
}

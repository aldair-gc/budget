import { Component } from "react";
import { BudgetItemProtocol } from "./protocols/budget-item-protocol";
import PropTypes from "prop-types";

export default class BudgetItem extends Component implements BudgetItemProtocol {
  description: string;
  value: number;
  status: "pending" | "done";
  constructor(props: BudgetItemProtocol) {
    super(props);
    this.description = props.description;
    this.value = props.value;
    this.status = "pending";
  }

  toggleStatus(): void {
    this.status = this.status === "pending" ? "done" : "pending";
  }

  propTypes = {
    description: PropTypes.string,
    value: PropTypes.number,
    status: PropTypes.string,
  };
  render() {
    return (
      <div className={"budget-item item-status-" + this.status}>
        <div className="description">{this.description}</div>
        <div className="value">{this.value}</div>
      </div>
    );
  }
}

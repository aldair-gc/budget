import { Component } from "react";
import { Transaction } from "../../interfaces";
import { Item, ItemBackground } from "./style";
import HiddenButtons from "./hiddenButtons";

export default class BudgetItem extends Component<Props, BudgetItemState> {
  constructor(props: Props){
    super(props);
    this.toggleStatus = this.props.toggleStatus.bind(this);
    this.setList = this.props.setList.bind(this);
    this.state = {
      description: props.item.description,
      value: props.item.value,
      expiration_day: props.item.expiration_day,
      editing: false,
      confirmDeletion: false,
    };
  }

  setList(list: Transaction[]): void {
    this.props.setList(list);
  }

  toggleStatus(id: number) {
    this.props.toggleStatus(id);
  }

  render() {
    const item: Transaction = {
      id: this.props.item.id,
      description: this.state.description,
      value: this.state.value,
      expiration_day: this.state.expiration_day,
      type: this.props.item.type,
      status: this.props.item.status,
      year: this.props.item.year,
      month: this.props.item.month,
      repeat: this.props.item.repeat,
    };
    const description = this.state.description;
    const value = this.state.value;
    const expiration_day = this.state.expiration_day;
    const editing = this.state.editing;
    const confirmDeletion = this.state.confirmDeletion;
    const setEditing = (trueOrFalse: boolean) => this.setState({editing: trueOrFalse});
    const setConfirmDeletion = (trueOrFalse: boolean) => this.setState({confirmDeletion: trueOrFalse});

    const resetItem = (): void => {
      this.setState({ description: this.props.item.description });
      this.setState({ value: this.props.item.value });
      this.setState({ expiration_day: this.props.item.expiration_day });
    };

    const listTotal = ():number => {
      const total = this.props.list.reduce((sum, thisItem) => thisItem.type === item.type ? sum += thisItem.value : sum += 0, 0);
      return Math.round((100 / total) * value);
    };

    return (
      <Item className={`budget-item item-id-${item.id} item-status-${item.status}`}>
        <input type="checkbox" id={item.id?.toString()} onChange={() => item.id && this.toggleStatus(item.id)} checked={item.status === "done"} />

        <input type="text" className="description"
          value={description}
          onChange={(e) => this.setState({ description: e.target.value })} disabled
        />

        <input type="number" className="value"
          value={value}
          onChange={(e) => this.setState({ value: e.target.valueAsNumber })} disabled
        />

        <input type="text" className="expiration_day"
          value={expiration_day || ""}
          onChange={(e) => this.setState({ expiration_day: (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31) ? parseInt(e.target.value) : 0 })} disabled
        />

        <HiddenButtons
          list={this.props.list} setList={this.setList} item={item} resetItem={resetItem}
          editing={editing} setEditing={setEditing}
          confirmDeletion={confirmDeletion} setConfirmDeletion={setConfirmDeletion}
        />

        <ItemBackground style={{ width: `${listTotal()}%`, background: item.type === "income" ? "#3a4" : "#d34"}} />
      </Item>
    );
  }
}

interface Props {
  item: Transaction,
  toggleStatus: (id: number) => void,
  list: Transaction[],
  setList: (list: Transaction[]) => void,
}

interface BudgetItemState {
  description: string,
  value: number,
  expiration_day: number,
  editing: boolean,
  confirmDeletion: boolean,
}

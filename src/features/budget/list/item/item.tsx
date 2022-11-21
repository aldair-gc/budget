import { Component } from "react";
import { Transaction } from "../../interfaces";
import PropTypes from "prop-types";
import { Item, ItemBackground } from "./style";
import EditItemButton from "./editItemButton";
import DeleteItemButton from "./deleteItemButton";

export default class BudgetItem extends Component<Props, {description: string, value: number, expiration_day: number, editing: boolean}> {
  static propTypes: {
    item: PropTypes.Requireable<object>;
    toggleStatus: PropTypes.Requireable<(id: number) => void>;
    list: PropTypes.Requireable<Transaction[]>;
    setList: PropTypes.Requireable<(list: Transaction[]) => void>;
  };

  constructor(props: Props){
    super(props);
    this.toggleStatus = this.props.toggleStatus.bind(this);
    this.setList = this.props.setList.bind(this);
    this.state = {
      description: props.item.description,
      value: props.item.value,
      expiration_day: props.item.expiration_day,
      editing: false,
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
    const setEditing = (trueOrFalse: boolean) => this.setState({editing: trueOrFalse});

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
      <Item className={`item-id-${item.id} item-status-${item.status}`}>
        <input type="checkbox" id={item.id?.toString()} onChange={() => item.id && this.toggleStatus(item.id)} checked={item.status === "done"} />

        <input type="text" className="description" value={description} onChange={(e) => this.setState({ description: e.target.value })} disabled />

        $<input type="text" className="value" value={value.toFixed(2)} onChange={(e) => this.setState({ value: parseFloat(e.target.value) || 0 })} disabled />

        <input type="text" className="expiration_day" value={expiration_day} onChange={(e) => this.setState({ expiration_day: parseInt(e.target.value) || 0 })} disabled />

        <EditItemButton item={item} editing={editing} setEditing={setEditing} list={this.props.list} setList={this.setList} />
        <DeleteItemButton item={item} editing={editing} setEditing={setEditing} list={this.props.list} resetItem={resetItem} setList={this.setList} />
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

BudgetItem.propTypes = {
  item: PropTypes.object,
  toggleStatus: PropTypes.func,
  list: PropTypes.array,
  setList: PropTypes.func,
};

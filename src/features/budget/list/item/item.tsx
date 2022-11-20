import { Component } from "react";
import { Transaction } from "../../interfaces";
import PropTypes from "prop-types";
import { Item } from "./style";
import EditItemButton from "./editItemButton";
import DeleteItemButton from "./deleteItemButton";

export default class BudgetItem extends Component<Props, {description: string, value: number, expiration_day: number, editing: boolean}> {
  static propTypes: { item: PropTypes.Requireable<object>; toggleStatus: PropTypes.Requireable<(id: number) => void>; };

  constructor(props: Props){
    super(props);
    this.toggleStatus = this.toggleStatus.bind(this);
    this.state = {
      description: props.item.description,
      value: props.item.value,
      expiration_day: props.item.expiration_day,
      editing: false,
    };
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
      try {
        this.setState({ description: this.props.item.description });
        this.setState({ value: this.props.item.value });
        this.setState({ expiration_day: this.props.item.expiration_day });
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <Item className={`item-id-${item.id} item-status-${item.status}`}>
        <input type="checkbox" id={item.id?.toString()} onChange={() => item.id && this.toggleStatus(item.id)} checked={item.status === "done"} />
        <input type="text" className="description" value={description} onChange={(e) => this.setState({ description: e.target.value })} disabled />
        R$ <input type="text" className="value" value={value} onChange={(e) => this.setState({ value: parseFloat(e.target.value) || 0 })} disabled />
        <input type="text" className="expiration_day" value={expiration_day} onChange={(e) => this.setState({ expiration_day: parseInt(e.target.value) || 0 })} disabled />
        {<EditItemButton item={item} editing={editing} setEditing={setEditing} />}
        {<DeleteItemButton item={item} editing={editing} setEditing={setEditing} resetItem={resetItem} />}

      </Item>
    );
  }
}

interface Props {
  toggleStatus: (id: number) => void,
  item: Transaction,
}

BudgetItem.propTypes = {
  toggleStatus: PropTypes.func,
  item: PropTypes.object,
};

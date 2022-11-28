/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, FormEvent } from "react";
import { FaTimesCircle } from "react-icons/fa";
import axios from "../../../services/axios";
import { EditOptionsInterface, SetEditOptionsInterface, Transaction } from "../interfaces";
import { Header, OptionsForm, Option, PropertiesContainer, Buttons } from "./style";

export default class Edit extends Component<Props, EditState> {
  constructor(props: Props) {
    super(props);
    this.setList = this.props.setList.bind(this);
    this.setId = this.props.setEditOptions.setId.bind(this);
    this.setUpdateFutureOnes = this.props.setEditOptions.setUpdateFutureOnes.bind(this);
    this.setOpenEditor = this.props.setEditOptions.setOpenEditor.bind(this);
    this.state = {
      type: "expenditure",
      description: "",
      value: 0,
      expiration_day: 0,
    };
  }

  setList(list: Transaction[]) { this.props.setList(list); }
  setId(id: number) { this.props.setEditOptions.setId(id); }
  setUpdateFutureOnes(updateFutureOnes: boolean) { this.props.setEditOptions.setUpdateFutureOnes(updateFutureOnes); }
  setOpenEditor(openEditor: boolean) { this.props.setEditOptions.setOpenEditor(openEditor); }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.editOptions.id === this.props.editOptions.id || !this.props.editOptions.id) return;
    const item = this.props.list[this.props.list.findIndex(item => item.id === this.props.editOptions.id )];
    if (!item) { this.setId(0); return; }
    this.setState({description: item.description});
    this.setState({type: item.type});
    this.setState({value: item.value});
    this.setState({expiration_day: item.expiration_day});
    this.setOpenEditor(true);
  }

  closeProperties = ():void => {
    this.setState({description: ""});
    this.setState({type: "expenditure"});
    this.setState({value: 0});
    this.setState({expiration_day: 0});
    this.setOpenEditor(false);
    this.setId(0);
  };

  async updateFutureTransactions(): Promise<void> {
    try {
      const relatedTransactions = await axios.get(`/transaction/${this.props.editOptions.id}`);
      if (relatedTransactions.status !== 200) return;

      (relatedTransactions.data as Array<Transaction>).forEach(async (transaction) => {
        if (transaction.year > new Date().getFullYear() || (transaction.year === new Date().getFullYear() && (transaction.month >= new Date().getMonth() + 1)))
          transaction.id && await this.updateTransaction(transaction.id);
      });

      return;
    } catch(error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  }

  updateComponent() {
    const newList = [...this.props.list];
    newList.forEach((item) => {
      if (item.id === this.props.editOptions.id) {
        item.type = this.state.type;
        item.description = this.state.description;
        item.value = this.state.value;
        item.expiration_day = this.state.expiration_day;
      }
    });
    this.setList(newList);
  }

  async updateTransaction(id: number): Promise<void> {
    const fieldsToUpdate = {
      type: this.state.type,
      description: this.state.description,
      value: this.state.value,
      expiration_day: this.state.expiration_day,
    };

    try {
      await axios.put(`/transaction/${id}`, fieldsToUpdate);
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  }

  async handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (this.props.editOptions.id === 0) return;

    if (this.props.editOptions.updateFutureOnes) {
      await this.updateFutureTransactions();
    } else {
      await this.updateTransaction(this.props.editOptions.id);
    }
    this.updateComponent();
    this.closeProperties();
  }

  render() {
    const type = this.state.type;
    const description = this.state.description;
    const value = this.state.value;
    const expiration_day = this.state.expiration_day;

    return this.props.editOptions.openEditor ? (
      <PropertiesContainer>
        <Header>
          <h1>Transaction {this.props.editOptions.id}</h1>
          <FaTimesCircle onClick={this.closeProperties}/>
        </Header>

        <OptionsForm onSubmit={(e) => this.handleSubmit(e)}>

          <Option>
            <label>Type:</label>
            <div className="radio">
              <div>
                <input type="radio" name="prop-type" id="prop-income"
                  onChange={(e) => e.target.checked && this.setState({type: "income"})}
                  defaultChecked={type === "income"} />
                <label htmlFor="prop-income">income</label>
              </div>

              <div>
                <input type="radio" name="prop-type" id="prop-expenditure"
                  onChange={(e) => e.target.checked && this.setState({type: "expenditure"})}
                  defaultChecked={type === "expenditure"} />
                <label htmlFor="prop-expenditure">expenditure</label>
              </div>
            </div>
          </Option>

          <Option>
            <label htmlFor="name">Description:</label>
            <input type="text" name="description" id="prop-description" value={description}
              onChange={(e) => this.setState({description: e.target.value})} />
          </Option>

          <Option>
            <label htmlFor="value">Value:</label>
            <input type="number" name="value" id="prop-value" value={value || ""}
              onChange={(e) => this.setState({value: (parseFloat(e.target.value) || 0)})} />
          </Option>

          <Option>
            <label htmlFor="expiration-day">Expiration day:</label>
            <input type="number" name="expiration-day" id="prop-expiration-day" min={1} max={31} value={expiration_day}
              onChange={(e) => this.setState({expiration_day: (parseInt(e.target.value || "") || 0)})} />
          </Option>

          {this.props.editOptions.updateFutureOnes ? <i>All future repetitions of this transaction will also be updated.</i> : ""}

          <Buttons>
            <input type="submit" value="Save" />
            <input type="button" value="Cancel" onClick={this.closeProperties} />
          </Buttons>
        </OptionsForm>

      </PropertiesContainer>
    ) : (<div/>);
  }
}

interface Props {
  editOptions: EditOptionsInterface,
  setEditOptions: SetEditOptionsInterface,
  list: Transaction[],
  setList: (list: Transaction[]) => void,
}

interface EditState {
  type: "expenditure" | "income",
  description: string,
  value: number,
  expiration_day: number,
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, FormEvent } from "react";
import { FaTimesCircle } from "react-icons/fa";
import axios from "../../../services/axios";
import { TransactionInterface } from "../interfaces";
import { WindowHeaderContainer, OptionsForm, Option, WindowBodyContainer, Buttons } from "./style";

export default class UserInput extends Component<Props, TransactionInterface> {
  constructor(props: Props) {
    super(props);
    this.setUserInput = this.props.setUserInput.bind(this);
    this.setIncomeList = this.props.setLists.setIncomeList.bind(this);
    this.setExpenditureList = this.props.setLists.setExpenditureList.bind(this);
    this.state = {
      type: "income",
      description: "",
      value: "",
      status: "pending",
      year: 0,
      month: 0,
      expiration_day: 0,
      repeat: "",
    };
  }

  setIncomeList(list: TransactionInterface[]) { this.props.setLists.setIncomeList(list); }
  setExpenditureList(list: TransactionInterface[]) { this.props.setLists.setExpenditureList(list); }
  setUserInput(userInput: number) { this.props.setUserInput(userInput); }

  componentDidUpdate(): void {
    if (this.props.userInput > 0) {
      const lists = this.props.lists.incomeList.concat(this.props.lists.expenditureList);
      const itemToCopy = lists[lists.findIndex(item => item.id === this.props.userInput)];
      this.setState({
        type: itemToCopy.type,
        description: itemToCopy.description,
        value: itemToCopy.value,
        status: itemToCopy.status,
        year: itemToCopy.year,
        month: itemToCopy.month,
        expiration_day: itemToCopy.expiration_day,
        repeat: itemToCopy.repeat
      }, () => this.setUserInput(0));
    }
  }

  cleanAndExit = ():void => {
    this.setUserInput(-1);
    this.setState({
      type: "expenditure",
      description: "",
      value: "",
      status: "pending",
      year: 0,
      month: 0,
      expiration_day: 0,
      repeat: "",
    });
  };

  async submitTransaction(): Promise<void> {
    const newTransaction = this.state;
    try {
      await axios.post("/transaction/", newTransaction);
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  }

  async handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    await this.submitTransaction();
    this.cleanAndExit();
  }

  render() {
    const item = this.state;

    return this.props.userInput === 0 ? (
      <WindowBodyContainer>
        <WindowHeaderContainer>
          <h1>New Transaction</h1>
          <FaTimesCircle onClick={this.cleanAndExit}/>
        </WindowHeaderContainer>

        <OptionsForm onSubmit={(e) => this.handleSubmit(e)}>

          <Option>
            <label>Type:</label>
            <div className="radio">
              <div>
                <input type="radio" name="input-type" id="input-income"
                  onChange={(e) => e.target.checked && this.setState({type: "income"})}
                  defaultChecked={item.type === "income"} />
                <label htmlFor="input-income">income</label>
              </div>

              <div>
                <input type="radio" name="input-type" id="input-expenditure"
                  onChange={(e) => e.target.checked && this.setState({type: "expenditure"})}
                  defaultChecked={item.type === "expenditure"} />
                <label htmlFor="input-expenditure">expenditure</label>
              </div>
            </div>
          </Option>

          <Option>
            <label htmlFor="name">Description:</label>
            <input type="text" name="description" id="input-description" value={item.description}
              onChange={(e) => this.setState({description: e.target.value})} />
          </Option>

          <Option>
            <label htmlFor="value">Value:</label>
            <input type="text" min={0}
              value={ item.value.toString().replace(",", "").replace(".", ",")}
              onChange={(e) => this.setState({ value: e.target.value.replace(/[^0-9,-]+/g, "").replace(/[,]+/g, ".") })}
            />
          </Option>

          <Option>
            <label htmlFor="expiration-day">Expiration day:</label>
            <input type="number"
              value={item.expiration_day || ""} min={0} max={31}
              onChange={(e) => this.setState({ expiration_day: (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31) ? parseInt(e.target.value) : 0 })}
            />
          </Option>

          <Option>
            <label>State:</label>
            <div className="radio">
              <div>
                <input type="radio" name="input-status" id="input-pending"
                  onChange={(e) => e.target.checked && this.setState({status: "pending"})}
                  defaultChecked={item.status === "pending"} />
                <label htmlFor="input-pending">pending</label>
              </div>

              <div>
                <input type="radio" name="input-status" id="input-done"
                  onChange={(e) => e.target.checked && this.setState({status: "done"})}
                  defaultChecked={item.status === "done"} />
                <label htmlFor="input-done">done</label>
              </div>
            </div>
          </Option>

          <Option>
            <label htmlFor="year">Year:</label>
            <input type="number" name="year" id="input-year" value={item.year || ""}
              onChange={(e) => this.setState({year: parseInt(e.target.value)})} />
          </Option>

          <Option>
            <label htmlFor="month">Month:</label>
            <input type="number" name="month" id="input-month" value={item.month || ""}
              onChange={(e) => this.setState({month: parseInt(e.target.value)})} />
          </Option>

          <Option>
            <label htmlFor="repeat">Repeat:</label>
            <input type="number" name="repeat" id="repeat" min={1} max={24} autoComplete="off"
              onChange={(e) => this.setState({repeat: `0-1-${e.target.value || 0}`})}
              value={parseInt(this.state.repeat.split("-")[2]) || ""} />
          </Option>

          <Buttons>
            <input type="submit" value="Save" />
            <input type="button" value="Cancel" onClick={this.cleanAndExit} />
          </Buttons>
        </OptionsForm>

      </WindowBodyContainer>
    ) : (<div/>);
  }
}

interface Props {
  userInput: number,
  setUserInput: (userInput: number) => void,
  lists: {incomeList: TransactionInterface[], expenditureList: TransactionInterface[]},
  setLists: {setIncomeList: (list: TransactionInterface[]) => void, setExpenditureList: (list: TransactionInterface[]) => void},
}

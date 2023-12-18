/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, FormEvent } from "react";
import { LanguageContext, NumberContext } from "../../app/App";
import axios from "../../services/axios";
import { TransactionInterface } from "../interfaces";
import { OptionsForm, Option, Buttons } from "./style";
import convertToFloat from "../../lib/convert-to-float";

export default class InputForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      type: props.options.type,
      description: props.options.description,
      value: props.options.value,
      status: props.options.status,
      year: props.options.year,
      month: props.options.month,
      expiration_day: props.options.expiration_day,
      repeat: props.options.repeat,
      valueOnFocus: false,
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.userInput !== this.props.userInput && this.props.userInput > 0) {
      const itemToCopy = this.props.list[this.props.list.findIndex((item) => item.id === this.props.userInput)];
      this.setState((state) => ({
        type: [state.type[0], itemToCopy.type],
        description: [state.description[0], itemToCopy.description],
        value: [state.value[0], itemToCopy.value],
        status: [state.status[0], itemToCopy.status],
        year: [state.year[0], itemToCopy.year],
        month: [state.month[0], itemToCopy.month],
        expiration_day: [state.expiration_day[0], itemToCopy.expiration_day],
        repeat: [state.repeat[0], itemToCopy.repeat],
      }));
      this.props.setUserInput(0);
    }

    if (prevProps.userInput !== this.props.userInput && this.props.userInput === 0) {
      this.setState({
        type: this.props.options.type,
        year: this.props.options.year,
        month: this.props.options.month,
      });
    }
  }

  cleanAndExit = (): void => {
    this.props.setUserInput(-1);
    this.setState((state) => ({
      type: [state.type[0], this.props.options.type[1]],
      description: [state.description[0], ""],
      value: [state.value[0], ""],
      status: [state.status[0], "pending"],
      year: [state.year[0], this.props.options.year[1]],
      month: [state.month[0], this.props.options.month[1]],
      expiration_day: [state.expiration_day[0], 0],
      repeat: [state.repeat[0], "0-1-1"],
    }));
  };

  async submitTransaction(): Promise<void> {
    const newTransaction = {
      type: this.state.type[1],
      description: this.state.description[1],
      value: convertToFloat(this.state.value[1]),
      status: this.state.status[1],
      year: this.state.year[1],
      month: this.state.month[1],
      expiration_day: this.state.expiration_day[1],
      repeat: this.state.repeat[1],
    };
    try {
      const submit = await axios.post("/transaction/", newTransaction);
      if (submit.status === 200 && this.state.year[1] === this.props.yearMonth.year && this.state.month[1] === this.props.yearMonth.month) {
        const newList = [...this.props.list, submit.data];
        this.props.setList(this.state.type[1], newList);
      }
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

  setType(type: OptionalType[1]) {
    this.setState((state) => ({
      type: [state.type[0], type],
    }));
  }

  render() {
    return this.props.userInput === 0 ? (
      <LanguageContext.Consumer>
        {({ file }) => (
          <OptionsForm onSubmit={(e) => this.handleSubmit(e)}>
            <Option style={{ display: this.state.type[0] ? "none" : "flex" }}>
              <label>{file.transaction.type.name}:</label>
              <div className="radio">
                <div>
                  <input
                    type="radio"
                    name="input-type"
                    id="input-income"
                    onChange={(e) => e.target.checked && this.setType("income")}
                    defaultChecked={this.state.type[1] === "income"}
                  />
                  <label htmlFor="input-income">{file.transaction.type.income}</label>
                </div>

                <div>
                  <input
                    type="radio"
                    name="input-type"
                    id="input-expenditure"
                    onChange={(e) => e.target.checked && this.setType("expenditure")}
                    defaultChecked={this.state.type[1] === "expenditure"}
                  />
                  <label htmlFor="input-expenditure">{file.transaction.type.expenditure}</label>
                </div>
              </div>
            </Option>

            <Option style={{ display: this.state.description[0] ? "none" : "flex" }}>
              <label htmlFor="name">{file.transaction.description}:</label>
              <input
                type="text"
                name="description"
                id="input-description"
                value={this.state.description[1]}
                onChange={(e) => this.setState((state) => ({ description: [state.description[0], e.target.value] }))}
              />
            </Option>

            <NumberContext.Consumer>
              {({ number }) => (
                <Option style={{ display: this.state.value[0] ? "none" : "flex" }}>
                  <label htmlFor="value">{file.transaction.value}:</label>
                  <input
                    type="currency"
                    min={0}
                    inputMode="decimal"
                    onFocus={() => this.setState({ valueOnFocus: true })}
                    onBlur={() => this.setState({ valueOnFocus: false })}
                    value={this.state.valueOnFocus ? this.state.value[1] : number.currency.format(convertToFloat(this.state.value[1]) || 0)}
                    onChange={(e) =>
                      this.setState((state) => ({
                        value: [state.value[0], e.target.value],
                      }))
                    }
                  />
                </Option>
              )}
            </NumberContext.Consumer>

            <Option style={{ display: this.state.expiration_day[0] ? "none" : "flex" }}>
              <label htmlFor="expiration-day">{file.transaction.expirationDay}:</label>
              <input
                type="number"
                inputMode="numeric"
                value={this.state.expiration_day[1] || ""}
                min={0}
                max={31}
                onChange={(e) =>
                  this.setState((state) => ({
                    expiration_day: [
                      state.expiration_day[0],
                      parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31 ? parseInt(e.target.value) : 0,
                    ],
                  }))
                }
              />
              <label htmlFor="expiration-day"> </label>
            </Option>

            <Option style={{ display: this.state.status[0] ? "none" : "flex" }}>
              <label>{file.transaction.status.name}:</label>
              <div className="radio">
                <div>
                  <input
                    type="radio"
                    name="input-status"
                    id="input-pending"
                    onChange={(e) => e.target.checked && { status: "pending" }}
                    defaultChecked={this.state.status[1] === "pending"}
                  />
                  <label htmlFor="input-pending">{file.transaction.status.pending}</label>
                </div>

                <div>
                  <input
                    type="radio"
                    name="input-status"
                    id="input-done"
                    onChange={(e) => e.target.checked && { status: "done" }}
                    defaultChecked={this.state.status[1] === "done"}
                  />
                  <label htmlFor="input-done">{file.transaction.status.done}</label>
                </div>
              </div>
            </Option>

            <Option style={{ display: this.state.year[0] ? "none" : "flex" }}>
              <label htmlFor="year">{file.transaction.year}:</label>
              <input
                type="number"
                name="year"
                id="input-year"
                value={this.state.year[1] || ""}
                inputMode="numeric"
                onChange={(e) => this.setState((state) => ({ year: [state.year[0], parseInt(e.target.value)] }))}
              />
            </Option>

            <Option style={{ display: this.state.month[0] ? "none" : "flex" }}>
              <label htmlFor="month">{file.transaction.month}:</label>
              <input
                type="number"
                name="month"
                id="input-month"
                value={this.state.month[1] || ""}
                inputMode="numeric"
                onChange={(e) => this.setState((state) => ({ month: [state.month[0], parseInt(e.target.value)] }))}
              />
            </Option>

            <Option style={{ display: this.state.repeat[0] ? "none" : "flex" }}>
              <label htmlFor="repeat">{file.input.repeatFor}:</label>
              <input
                type="number"
                name="repeat"
                id="repeat"
                min={1}
                max={24}
                autoComplete="off"
                inputMode="numeric"
                onChange={(e) => this.setState((state) => ({ repeat: [state.repeat[0], `0-1-${e.target.value || 0}`] }))}
                value={parseInt(this.state.repeat[1].split("-")[2]) || ""}
              />
              <label htmlFor="repeat">{file.input.months}</label>
            </Option>

            <Buttons>
              <input type="submit" value={file.input.save} />
              <input type="button" value={file.input.cancel} onClick={this.cleanAndExit} />
            </Buttons>
          </OptionsForm>
        )}
      </LanguageContext.Consumer>
    ) : (
      <></>
    );
  }
}

interface Props {
  userInput: number;
  setUserInput: (userInput: number) => void;
  list: TransactionInterface[];
  setList: (type: "income" | "expenditure", list: TransactionInterface[]) => void;
  yearMonth: { year: number; month: number };
  options: {
    type: OptionalType;
    description: OptionalDescription;
    value: OptionalValue;
    status: OptionalStatus;
    year: OptionalYear;
    month: OptionalMonth;
    expiration_day: OptionalExpiration;
    repeat: OptionalRepeat;
  };
}

type OptionalType = [boolean, "expenditure" | "income"];
type OptionalDescription = [boolean, string];
type OptionalValue = [boolean, string];
type OptionalStatus = [boolean, "pending" | "done"];
type OptionalYear = [boolean, number];
type OptionalMonth = [boolean, number];
type OptionalExpiration = [boolean, number];
type OptionalRepeat = [boolean, string];

interface State {
  type: OptionalType;
  description: OptionalDescription;
  value: OptionalValue;
  status: OptionalStatus;
  year: OptionalYear;
  month: OptionalMonth;
  expiration_day: OptionalExpiration;
  repeat: OptionalRepeat;
  valueOnFocus: boolean;
}

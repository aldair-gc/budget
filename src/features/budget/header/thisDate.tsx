import { DateHeader } from "./style";

export default function ThisDate(props: {yearMonth: {year: number, month: number}}) {
  return (
    <DateHeader>
      <div className="this-container">
        <div className="this-month">
          {props.yearMonth.month.toString()}
        </div>
        <div className="this-bar" />
        <div className="this-year">
          {props.yearMonth.year.toString()}
        </div>
      </div>
    </DateHeader>
  );
}

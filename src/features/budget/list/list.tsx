/* eslint-disable @typescript-eslint/no-explicit-any */
import { Transaction } from "../interfaces";
import { ItemList, ListBackground, ListContainer } from "./style";
import axios from "../../../services/axios";
import BudgetItem from "./item/item";

export default function BudgetList(props: Props) {
  const toggleStatus = (id: number) => {
    try {
      const newList = [...props.list];
      newList.map(async (item) => {
        if (item.id === id) {
          item.status = item.status === "pending" ? "done" : "pending";
          const update = await axios.put(`/transaction/${item.id.toString()}`, { status: item.status });
          if (update.status !== 200) {
            item.status = item.status === "pending" ? "done" : "pending";
            console.log("Error updating database");
          }
        }
      });
      props.setList(newList);
    } catch (error: any) {
      const errors = error.response.data.errors ?? [];
      errors.map((err: any) => console.log(err));
    }
  };

  function totalEstimated(type: "income" | "expenditure" | "all", status: "pending" | "done" | "all"): number {
    return props.list.reduce((sum, item) => sum += ((item.type === type || type === "all") && (item.status === status || status === "all")) ? item.value : 0, 0);
  }

  function percentageDone(type: "income" | "expenditure"):number {
    return Math.floor((totalEstimated(type, "done") * 100) / totalEstimated(type, "all"));
  }

  return (
    <ListContainer>
      <ItemList>
        {props.list.map(item =>item.type === props.type &&
          <BudgetItem key={item.id} item={item} toggleStatus={toggleStatus} />
        )}
      </ItemList>

      <ListBackground style={{ height: `${percentageDone(props.type)}%`, background: props.type === "income" ? "#bfc" : "#fbc" }} />
    </ListContainer>
  );
}

interface Props {
  list: Transaction[],
  setList: (list: Transaction[]) => void,
  type: "income" | "expenditure",
}

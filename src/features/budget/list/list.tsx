/* eslint-disable @typescript-eslint/no-explicit-any */
import { Transaction } from "../interfaces";
import { ListContainer } from "./style";
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

  return (
    <ListContainer>
      {props.list.map(item =>item.type === props.type &&
        <BudgetItem key={item.id} item={item} toggleStatus={toggleStatus} />
      )}
    </ListContainer>
  );
}

interface Props {
  list: Transaction[],
  setList: (list: Transaction[]) => void,
  type: "income" | "expenditure",
}

import { Container, List, Numbers } from "./style";

export default function TotalsContainer(props: Props) {
  return (
    <Container>
      <List>
        <Numbers>
          <p>Received $ {props.totalEstimated("income", "done").toFixed(2)} of $ {props.totalEstimated("income", "all").toFixed(2)}</p>
          <p>{Math.floor((props.totalEstimated("income", "done") * 100) / props.totalEstimated("income", "all")) + "%"}</p>
        </Numbers>
      </List>
      <List>
        <Numbers>
          <p>Payed $ {props.totalEstimated("expenditure", "done").toFixed(2)} of $ {props.totalEstimated("expenditure", "all").toFixed(2)}</p>
          <p>{Math.floor((props.totalEstimated("expenditure", "done") * 100) / props.totalEstimated("expenditure", "all")) || 0 + "%"}</p>
        </Numbers>
      </List>
    </Container>
  );
}

interface Props {
  totalEstimated: (type: "income" | "expenditure" | "all", status: "done" | "pending" | "all") => number,
  totalPercent: (type: "income" | "expenditure") => { width: string },
}

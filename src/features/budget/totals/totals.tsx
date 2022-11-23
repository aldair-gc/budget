import { Container, Graph, List, Numbers } from "./style";

export default function TotalsContainer(props: Props) {

  function percentageDone(type: "income" | "expenditure"):number {
    return Math.floor((props.totalEstimated(type, "done") * 100) / props.totalEstimated(type, "all"));
  }

  return (
    <Container>
      <List>
        <Numbers>
          <p>$ {props.totalEstimated("income", "done").toFixed(2)}</p>
          <p>{Math.floor(((props.totalEstimated("income", "done") * 100) / props.totalEstimated("income", "all")) || 0) + "%"}</p>
          <p>$ {props.totalEstimated("income", "all").toFixed(2)}</p>
        </Numbers>
        <Graph style={{ width: `${percentageDone("income")}%`, background: "#bdc" }} />
      </List>
      <List>
        <Numbers>
          <p>$ {props.totalEstimated("expenditure", "done").toFixed(2)}</p>
          <p>{Math.floor(((props.totalEstimated("expenditure", "done") * 100) / props.totalEstimated("expenditure", "all")) || 0) + "%"}</p>
          <p>$ {props.totalEstimated("expenditure", "all").toFixed(2)}</p>
        </Numbers>
        <Graph style={{ width: `${percentageDone("expenditure")}%`, background: "#dbc" }} />
      </List>
    </Container>
  );
}

interface Props {
  totalEstimated: (type: "income" | "expenditure" | "all", status: "done" | "pending" | "all") => number,
  totalPercent: (type: "income" | "expenditure") => { width: string },
}

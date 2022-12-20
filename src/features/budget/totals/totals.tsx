import { Container, Graph, List, Numbers } from "./style";

export default function TotalsContainer(props: Props) {
  return (
    <Container>
      <List>
        <Numbers>
          <p>{props.totalEstimated("income", "done")} / {props.totalEstimated("income", "all")}</p>
          <p>{Math.floor((props.totalEstimated("income", "done") * 100) / props.totalEstimated("income", "all")) + "%"}</p>
        </Numbers>
        <Graph style={props.totalPercent("income")} />
      </List>
      <List>
        <Numbers>
          <p>{props.totalEstimated("expenditure", "done")} / {props.totalEstimated("expenditure", "all")}</p>
          <p>{Math.floor((props.totalEstimated("expenditure", "done") * 100) / props.totalEstimated("expenditure", "all")) + "%"}</p>
        </Numbers>
        <Graph style={props.totalPercent("expenditure")} />
      </List>
    </Container>
  );
}

interface Props {
  totalEstimated: (type: "income" | "expenditure" | "all", status: "done" | "pending" | "all") => number,
  totalPercent: (type: "income" | "expenditure") => { width: string },
}

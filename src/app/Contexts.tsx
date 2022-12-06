import { ReactElement } from "react";
import Loading from "../common/Loading/Loading";

export default function Contexts(props: { children: ReactElement; }) {
  return (
    <Loading>
      {props.children}
    </Loading>
  );
}

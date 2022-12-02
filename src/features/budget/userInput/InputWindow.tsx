/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { WindowBodyContainer, WindowHeaderContainer, WindowContainer } from "./style";

export default function InputWindow(props: Props) {

  return (
    <WindowContainer style={{display: props.show === 0 ? "flex" : "none"}}>
      <WindowHeaderContainer>
        <h1>New Transaction</h1>
      </WindowHeaderContainer>
      <WindowBodyContainer>
        {props.children}
      </WindowBodyContainer>

    </WindowContainer>
  );
}

interface Props {
  children: ReactNode;
  show: number;
}

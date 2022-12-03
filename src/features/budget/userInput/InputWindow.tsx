/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { WindowBodyContainer, WindowHeaderContainer, WindowContainer, Evidence } from "./style";

export default function InputWindow(props: Props) {

  return (
    <Evidence style={{display: props.show === 0 ? "flex" : "none"}}>
      <WindowContainer>
        <WindowHeaderContainer>
          <h1>New Transaction</h1>
        </WindowHeaderContainer>
        <WindowBodyContainer>
          {props.children}
        </WindowBodyContainer>
      </WindowContainer>
    </Evidence>
  );
}

interface Props {
  children: ReactNode;
  show: number;
}

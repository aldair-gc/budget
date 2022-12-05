/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { WindowContainer, WindowHeaderContainer, WindowBodyContainer } from "../../../common/commonStyles";
import { LayerContainer } from "../../../common/Layer/style";

export default function InputWindow(props: Props) {

  return (
    <LayerContainer style={{display: props.show === 0 ? "flex" : "none"}}>
      <WindowContainer>
        <WindowHeaderContainer>
          <h1>New Transaction</h1>
        </WindowHeaderContainer>
        <WindowBodyContainer>
          {props.children}
        </WindowBodyContainer>
      </WindowContainer>
    </LayerContainer>
  );
}

interface Props {
  children: ReactNode;
  show: number;
}

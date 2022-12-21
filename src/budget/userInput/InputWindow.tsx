/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { LanguageContext } from "../../app/App";
import { WindowContainer, WindowHeaderContainer, WindowBodyContainer } from "../../common/commonStyles";
import { LayerContainer } from "../../common/Layer/style";

export default function InputWindow(props: Props) {
  return (
    <LanguageContext.Consumer>
      {({ file }) => (
        <LayerContainer style={{ display: props.show === 0 ? "flex" : "none" }}>
          <WindowContainer>
            <WindowHeaderContainer>
              <h1>{file.input.newTransaction}</h1>
            </WindowHeaderContainer>
            <WindowBodyContainer>{props.children}</WindowBodyContainer>
          </WindowContainer>
        </LayerContainer>
      )}
    </LanguageContext.Consumer>
  );
}

interface Props {
  children: ReactNode;
  show: number;
}

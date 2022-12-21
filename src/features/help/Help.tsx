/* eslint-disable react/no-unescaped-entities */
import { FaRegTimesCircle } from "react-icons/fa";
import { LanguageContext } from "../../app/App";
import { WindowBodyContainer, WindowContainer, WindowHeaderContainer } from "../../common/commonStyles";
import { LayerContainer } from "../../common/Layer/style";
import { HelpContainer } from "./style";

export default function Settings(props: { close: () => void }) {
  return (
    <LanguageContext.Consumer>
      {({ file }) => (
        <LayerContainer>
          <WindowContainer>
            <WindowHeaderContainer>
              <button onClick={() => props.close()}>
                <FaRegTimesCircle />
              </button>
              <h1>{file.help.title}</h1>
            </WindowHeaderContainer>
            <WindowBodyContainer width={"350px"} height={"400px"}>
              <HelpContainer>
                <h1>{file.help.intro}</h1>
                <li>
                  <h2>{file.help.sub01.title}</h2>
                  <p>{file.help.sub01.text}</p>
                </li>
                <li>
                  <h2>{file.help.sub02.title}</h2>
                  <p>{file.help.sub02.text}</p>
                </li>
              </HelpContainer>
            </WindowBodyContainer>
          </WindowContainer>
        </LayerContainer>
      )}
    </LanguageContext.Consumer>
  );
}

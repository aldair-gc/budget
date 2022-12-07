import { FaRegTimesCircle } from "react-icons/fa";
import { WindowBodyContainer, WindowContainer, WindowHeaderContainer } from "../../common/commonStyles";
import { LayerContainer } from "../../common/Layer/style";
import { HelpContainer } from "./style";

export default function Settings(props: { close: () => void; }){
  return (
    <LayerContainer>
      <WindowContainer>
        <WindowHeaderContainer>
          <button onClick={() => props.close()}>
            <FaRegTimesCircle/>
          </button>
          <h1>Settings</h1>
        </WindowHeaderContainer>
        <WindowBodyContainer width={"350px"} height={"400px"}>
          <HelpContainer>
            <h1>Help</h1>
            <li>First</li>
            <li>Second</li>
          </HelpContainer>
        </WindowBodyContainer>
      </WindowContainer>
    </LayerContainer>
  );
}

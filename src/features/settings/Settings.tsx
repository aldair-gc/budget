import { useState } from "react";
import { FaRegArrowAltCircleLeft, FaRegTimesCircle } from "react-icons/fa";
import { WindowBodyContainer, WindowContainer, WindowHeaderContainer } from "../../common/commonStyles";
import { LayerContainer } from "../../common/Layer/style";
import { MenuContainer, SettingsContainer } from "./style";
import UpdateUser from "./UpdateUser";

type SettingsTypes = "none" | "updateUser" | "deleteUser" | "downloadData";

export default function Settings(props: { close: () => void; }){
  const [selection, setSelection] = useState("none" as SettingsTypes);

  return (
    <LayerContainer>
      <WindowContainer>
        <WindowHeaderContainer>
          <button onClick={() => selection !== "none" ? setSelection("none") : props.close()}>
            {selection !== "none" ? <FaRegArrowAltCircleLeft/> : <FaRegTimesCircle/>}
          </button>
          <h1>Settings</h1>
        </WindowHeaderContainer>
        <WindowBodyContainer width={"350px"} height={"500px"}>
          <SettingsContainer>
            {selection === "none" &&
              <MenuContainer>
                <li onClick={() => setSelection("updateUser")}>Edit account</li>
                <li onClick={() => setSelection("none")}>Delete account</li>
                <li onClick={() => setSelection("none")}>Download data</li>
              </MenuContainer>
            }
            {selection === "updateUser" && <UpdateUser/>}
          </SettingsContainer>
        </WindowBodyContainer>
      </WindowContainer>
    </LayerContainer>
  );
}

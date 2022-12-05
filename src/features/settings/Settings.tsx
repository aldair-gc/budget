// import { useState } from "react";
import { WindowBodyContainer, WindowContainer, WindowHeaderContainer } from "../../common/commonStyles";
import { LayerContainer } from "../../common/Layer/style";
import { SettingsContainer } from "./style";

export default function Settings(){
  // const [selection, setSelection] = useState(0);

  return (
    <LayerContainer>
      <WindowContainer>
        <WindowHeaderContainer>
          <h1>Settings</h1>
        </WindowHeaderContainer>
        <WindowBodyContainer width={"350px"} height={"500px"}>
          <SettingsContainer>
            <div>Edit user name</div>
            <div>Edit user email</div>
            <div>Edit user password</div>
            <div>Delete user account</div>
            <div>Download user data</div>
          </SettingsContainer>
        </WindowBodyContainer>
      </WindowContainer>
    </LayerContainer>
  );
}

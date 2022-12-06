import { useState } from "react";
import { WindowBodyContainer, WindowContainer, WindowHeaderContainer } from "../../common/commonStyles";
import { LayerContainer } from "../../common/Layer/style";
import { SettingsContainer } from "./style";
import UpdateUser from "./UpdateUser";

type SettingsTypes = "none" | "updateUser";

export default function Settings(){
  const [selection, setSelection] = useState("updateUser" as SettingsTypes);

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
            {selection === "updateUser" && <UpdateUser/>}
          </SettingsContainer>
        </WindowBodyContainer>
      </WindowContainer>
    </LayerContainer>
  );
}

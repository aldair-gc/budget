import { FaUser } from "react-icons/fa";
import { useAppDispatch } from "../../app/hooks";
import { authLogout } from "../authentication/authSlice";
import { UserButtonContainer, UserContainer } from "./style";
import axios from "../../services/axios";
import { useState } from "react";
import Settings from "../settings/Settings";

export default function UserAccess() {
  const dispatch = useAppDispatch();

  const [settings, setSettings] = useState(false);

  function toggleSize():void {
    const box = (document.querySelector("#user-access") as HTMLDivElement).style;
    if (box.width !== "50px" && box.width !== "") {
      box.width = "50px";
    } else {
      box.width = "300px";
    }
  }

  const logout = () => {
    dispatch(authLogout());
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <UserContainer>
      <UserButtonContainer id="user-access" onClick={() => toggleSize()}>
        <h3 onClick={() => console.log("Pending setup")}>Help</h3>
        <h3 onClick={() => setSettings(true)}>Settings</h3>
        <h3 onClick={logout}>Logout</h3>
        <FaUser id="user-icon"/>
      </UserButtonContainer>

      {settings && <Settings close={() => setSettings(false)}/>}
    </UserContainer>
  );
}

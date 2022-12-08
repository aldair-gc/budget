import { FaUser } from "react-icons/fa";
import { useAppDispatch } from "../../app/hooks";
import { authLogout } from "../authentication/authSlice";
import { UserButtonContainer, UserContainer } from "./style";
import axios from "../../services/axios";
import { useState } from "react";
import Settings from "../settings/Settings";
import Help from "../help/Help";

export default function UserAccess() {
  const dispatch = useAppDispatch();

  const [option, setOption] = useState("none" as "none" | "settings" | "help");

  function toggleSize():void {
    const box = (document.querySelector("#user-access") as HTMLDivElement).style;
    if (box.width !== "50px" && box.width !== "") {
      box.width = "50px";
    } else {
      box.width = "310px";
    }
  }

  const logout = () => {
    dispatch(authLogout());
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <UserContainer>
      <UserButtonContainer id="user-access" onClick={() => toggleSize()}>
        <h3 onClick={() => setOption("help")}>Help</h3>
        <h3 onClick={() => setOption("settings")}>Settings</h3>
        <h3 onClick={logout}>Logout</h3>
        <FaUser id="user-icon"/>
      </UserButtonContainer>

      {option === "help" && <Help close={() => setOption("none")}/>}
      {option === "settings" && <Settings close={() => setOption("none")}/>}
    </UserContainer>
  );
}

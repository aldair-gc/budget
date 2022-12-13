import { FaUser } from "react-icons/fa";
import { useAppDispatch } from "../../app/hooks";
import { authLogout } from "../authentication/authSlice";
import { UserButtonContainer, UserContainer } from "./style";
import axios from "../../services/axios";
import { useState } from "react";
import Settings from "../settings/Settings";
import Help from "../help/Help";
import { LanguageContext } from "../../app/App";

export default function UserAccess() {
  const dispatch = useAppDispatch();

  const [option, setOption] = useState("settings" as "none" | "settings" | "help");

  function toggleSize():void {
    const box = (document.querySelector("#user-access") as HTMLDivElement).style;
    if (box.width !== "50px" && box.width !== "") {
      box.width = "50px";
    } else {
      box.width = window.screen.width < 600 ? "310px" : "250px";
    }
  }

  const logout = () => {
    dispatch(authLogout());
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <LanguageContext.Consumer>
      {({file}) => (
        <UserContainer>
          <UserButtonContainer id="user-access" onClick={() => toggleSize()}>
            <button onClick={() => setOption("help")}>{file.userAccess.help}</button>
            <button onClick={() => setOption("settings")}>{file.userAccess.settings}</button>
            <button onClick={logout}>{file.userAccess.logout}</button>
            <FaUser id="user-icon"/>
          </UserButtonContainer>

          {option === "help" && <Help close={() => setOption("none")}/>}
          {option === "settings" && <Settings close={() => setOption("none")}/>}
        </UserContainer>
      )}
    </LanguageContext.Consumer>
  );
}

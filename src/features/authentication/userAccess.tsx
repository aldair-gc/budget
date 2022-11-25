import { FaUser } from "react-icons/fa";
import { useAppDispatch } from "../../app/hooks";
import { authLogout } from "./authSlice";
import { UserButton } from "./style";
import axios from "../../services/axios";

export default function UserAccess() {
  const dispatch = useAppDispatch();

  function toggleSize():void {
    const box = (document.querySelector("#user-access") as HTMLDivElement).style;
    if (box.width !== "50px" && box.width !== "") {
      box.width = "50px";
    } else {
      box.width = "200px";
    }
  }

  const logout = () => {
    dispatch(authLogout());
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <UserButton id="user-access" onClick={() => toggleSize()}>
      <h3 onClick={logout}>Logout</h3>
      <h3 onClick={() => console.log("Pending setup")}>Settings</h3>
      <FaUser id="user-icon"/>
    </UserButton>
  );
}

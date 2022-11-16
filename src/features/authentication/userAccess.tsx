import { FaUser } from "react-icons/fa";
import { useAppDispatch } from "../../app/hooks";
import { authLogout } from "./authSlice";
import { UserButton } from "./style";
import axios from "../../services/axios";

export default function UserAccess() {
  const dispatch = useAppDispatch();

  function toggleSize():void {
    const box = (document.querySelector("#user-access") as HTMLDivElement).style;
    if (box.width !== "40px" && box.width !== "") {
      box.width = "40px";
      box.height = "40px";
      box.borderRadius = "50%";
      box.boxShadow = "0 0 2px rgba(0,0,0,0.8)";
    } else {
      box.width = "160px";
      box.height = "130px";
      box.borderRadius = "5%";
      box.boxShadow = "0 0 20px rgba(0,0,0,0.8)";
    }
  }

  const logout = () => {
    dispatch(authLogout());
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <UserButton id="user-access" onClick={() => toggleSize()}>
      <FaUser id="user-icon"/>
      <h3 onClick={logout}>Logout</h3>
      <h3 onClick={() => console.log("Pending setup")}>Change password</h3>
    </UserButton>
  );
}

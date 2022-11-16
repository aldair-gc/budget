import { useAppSelector } from "../../app/hooks";
import Login from "./login";
import Register from "./register";
import { DoubleWideBox, Evidence } from "./style";
import UserAccess from "./userAccess";

export default function Authentication() {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  function changePosition(option: number):void {
    const box = (document.querySelector("#wide-box") as HTMLDivElement).style;
    switch (option) {
    case 1: box.transform = "translateX(25%)"; break;
    case 2: box.transform = "translateX(-25%)"; break;
    default: box.transform = "translateX(25%)"; break;
    }
  }

  return isLoggedIn ? (
    <UserAccess/>
  ) : (
    <Evidence>
      <DoubleWideBox id="wide-box" >
        <Login position={changePosition}/>
        <Register position={changePosition}/>
      </DoubleWideBox>
    </Evidence>
  );
}

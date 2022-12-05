import { useAppSelector } from "../../app/hooks";
import Login from "./login";
import Register from "./register";
import { Container, DoubleWideBox } from "./style";
import UserAccess from "../userAccess/userAccess";
import { LayerContainer } from "../../common/Layer/style";

export default function Authentication() {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  function changePosition(option: number):void {
    const box = (document.querySelector("#wide-box") as HTMLDivElement).style;
    switch (option) {
    case 1: box.transform = "translateX(0%)"; break;
    case 2: box.transform = "translateX(-50%)"; break;
    default: box.transform = "translateX(0%)"; break;
    }
  }

  return isLoggedIn ? (
    <UserAccess/>
  ) : (
    <LayerContainer>
      <Container>
        <DoubleWideBox id="wide-box" >
          <Login position={changePosition}/>
          <Register position={changePosition}/>
        </DoubleWideBox>
      </Container>
    </LayerContainer>
  );
}

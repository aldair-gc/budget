import { useAppSelector } from "../../app/hooks";
import Login from "./login";
import Register from "./register";
import { Container, DoubleWideBox, LogoContainer } from "./style";
import { LayerContainer } from "../../common/Layer/style";
import Loading from "../../common/Loading/Loading";

export default function Authentication() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  function changePosition(option: number): void {
    const box = (document.querySelector("#wide-box") as HTMLDivElement).style;
    /* eslint-disable indent */
    switch (option) {
      case 1:
        box.transform = "translateX(0%)";
        break;
      case 2:
        box.transform = "translateX(-50%)";
        break;
      default:
        box.transform = "translateX(0%)";
        break;
    }
  }

  return isLoggedIn ? (
    <></>
  ) : (
    <LayerContainer>
      <Container>
        <Loading />
        <LogoContainer>Budget</LogoContainer>
        <DoubleWideBox id="wide-box">
          <Login position={changePosition} />
          <Register position={changePosition} />
        </DoubleWideBox>
      </Container>
    </LayerContainer>
  );
}

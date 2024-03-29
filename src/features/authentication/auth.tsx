import { useAppSelector } from "../../app/hooks";
import Login from "./login";
import Register from "./register";
import { Container, DoubleWideBox, LogoContainer } from "./style";
import { LayerContainer } from "../../common/Layer/style";
import Loading from "../../common/Loading/Loading";
import ForgotPassword from "./forgot-password";
import ResetPassword from "./reset-password";
import { useEffect } from "react";

export default function Authentication() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const loginOption = parseInt(urlParams.get("loginopt") as string, 10);
    const box = document.querySelector("#wide-box") as HTMLDivElement;
    box && changePosition(loginOption);
  }, []);

  const innerPages = [
    <Login key={"login"} position={changePosition} />,
    <Register key={"register"} position={changePosition} />,
    <ForgotPassword key={"forgot"} position={changePosition} />,
    <ResetPassword key={"reset"} position={changePosition} />,
  ];

  function changePosition(option: number): void {
    const box = (document.querySelector("#wide-box") as HTMLDivElement).style;
    /* eslint-disable indent */
    switch (option) {
      case 1:
        box.transform = "translateX(0%)";
        break;
      case 2:
        box.transform = "translateX(-25%)";
        break;
      case 3:
        box.transform = "translateX(-50%)";
        break;
      case 4:
        box.transform = "translateX(-75%)";
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
        <DoubleWideBox id="wide-box" style={{ minWidth: `calc(100% * ${innerPages.length})` }}>
          {innerPages.map((page) => {
            return page;
          })}
        </DoubleWideBox>
      </Container>
    </LayerContainer>
  );
}

import { FaCheck, FaCircleNotch, FaTimes } from "react-icons/fa";
import { LoadingContext } from "../../app/App";
import { LoadingLayer, LoadingIcon, SuccessIcon, FailureIcon, LoadingContainer } from "./style";

// type LoadingType = "idle" | "loading" | "success" | "failure";

export default function Loading() {
  return (
    <LoadingContext.Consumer>
      {({status, setStatus}) => (
        <LoadingLayer style={{display: status !== "idle" ? "block" : "none"}}>
          <LoadingContainer>
            {status === "loading" && <LoadingIcon><FaCircleNotch/></LoadingIcon>}
            {status === "success" && setTimeout(() => setStatus("idle"), 1000) && <SuccessIcon><FaCheck/></SuccessIcon>}
            {status === "failure" && setTimeout(() => setStatus("idle"), 1000) && <FailureIcon><FaTimes/></FailureIcon>}
          </LoadingContainer>
        </LoadingLayer>
      )}
    </LoadingContext.Consumer>
  );
}

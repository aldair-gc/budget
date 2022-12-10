import { FaCheck, FaCircleNotch, FaTimes } from "react-icons/fa";
import { LoadingContext } from "../../app/App";
import { LoadingLayer, LoadingIcon, SuccessIcon, FailureIcon, LoadingContainer } from "./style";

// type LoadingType = "idle" | "loading" | "success" | "failure";

export default function Loading() {
  return (
    <LoadingContext.Consumer>
      {({status}) => (
        <LoadingLayer style={{display: status !== "idle" ? "block" : "none"}}>
          <LoadingContainer>
            <LoadingContext.Consumer>{({setStatus}) => (
              <>
                {status === "loading" && <LoadingIcon><FaCircleNotch/></LoadingIcon>}
                {status === "success" && setTimeout(() => setStatus("idle"), 2000) && <SuccessIcon><FaCheck /></SuccessIcon>}
                {status === "failure" && setTimeout(() => setStatus("idle"), 2000) && <FailureIcon><FaTimes/></FailureIcon>}
              </>
            )}</LoadingContext.Consumer>
          </LoadingContainer>
        </LoadingLayer>
      )}
    </LoadingContext.Consumer>
  );
}

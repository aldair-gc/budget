import styled from "styled-components";

export const LoadingLayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.general.layer};
  z-index: 900;
  transition: all 0.2s;
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  height: 50px;
  width: 50px;
  font-size: 50px;
  border-radius: 50%;
  overflow: hidden;
`;
export const LoadingIcon = styled.div`
  animation: 1s linear infinite step;
  color: ${(props) => props.theme.general.loadingIcon};

  @keyframes step {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const SuccessIcon = styled.div`
  animation: 0.5s linear forwards color;

  @keyframes color {
    from {
      color: ${(props) => props.theme.general.loadingIcon};
    }
    to {
      color: ${(props) => props.theme.general.loadingSuccess};
    }
  }
`;

export const FailureIcon = styled.div`
  animation: 0.5s linear forwards color;

  @keyframes color {
    from {
      color: ${(props) => props.theme.general.loadingIcon};
    }
    to {
      color: ${(props) => props.theme.general.loadingFailure};
    }
  }
`;

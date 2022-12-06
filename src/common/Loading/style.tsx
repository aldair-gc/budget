import styled from "styled-components";

export const LoadingLayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.3);
  z-index: 900;
  transition: all .2s;
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  text-align: center;
  height: 70px;
  width: 70px;
  font-size: 70px;
  background: #bbb;
  border-radius: 50%;
  overflow: hidden;
`;
export const LoadingIcon = styled.div`
  animation: 1s linear infinite step;
  background: #bbb;

  @keyframes step {
    from {transform: rotate(0deg)};
    to {transform: rotate(360deg)}
  }
`;

export const SuccessIcon = styled.div`
  animation: 1s linear forwards color;
  background: #bbb;

  @keyframes color {
    from { color: #000; }
    to { color: #3f3 }
  }
`;

export const FailureIcon = styled.div`
  animation: 1s linear forwards color;
  background: #bbb;

  @keyframes color {
    from { color: #000; }
    to { color: #f33 }
  }
`;

import styled from "styled-components";

export const Layer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(3px);
`;

export const Box = styled.div`
  position: relative;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 140px;
  border-radius: 8px;
  padding: 10px;
  gap: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);

  h1 {
    text-align: center;
    margin-top: 10px;
    font-size: 20px;
  }

  button {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    height: 40px;
    width: 100px;
    border-radius: 8px;
    border: 1px solid #000;
  }
`;

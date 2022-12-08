import styled from "styled-components";

export const UserContainer = styled.div`
  position: absolute;
  z-index: 500;
  top: 10px;
  right: 10px;

  @media (max-width: 600px) {
    top: 10px;
    right: 10px;
  }
`;

export const UserButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 10px;
  background: #aaa;
  border-radius: 25px;
  width: 50px;
  height: 50px;
  transition: all 0.3s;
  gap: 20px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0,0,0,0.5) inset;

  #user-icon {
    font-size: 30px;
    flex: 0 0 auto;
    color: #333;
  }

  h3 {
    text-align: center;
    background: #fff;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    color: #333;
  }

  h3:hover {
    background: #ddd;
  }

  h3:active {
    background: #ccc;
  }
`;

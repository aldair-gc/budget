import styled from "styled-components";

export const Evidence = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(10px);
  z-index: 900;
`;

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 400px;
  box-shadow: 0 0 25px rgba(0,0,0,0.8);
  border-radius: 10px;
  overflow: hidden;
`;

export const DoubleWideBox = styled.div`
  display: flex;
  min-width: 200%;
  height: 100%;
  background: #fff;
  transform: translateX(0%);
  transition: all 0.3s;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
  }

  label {
    font-size: 13px;
  }

  input {
    padding: 3px 5px;
  }

  input[type=submit] {
    padding: 10px;
    width: 60%;
    margin: 10px auto;
  }

  .input-message {
    color: #a00;
    text-align: right;
    font-size: 13px;
  }

  h2 {
    cursor: pointer;
    font-size: 16px;
  }
`;

export const UserButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 10px;
  top: 20px;
  right: 20px;
  background: #aaa;
  border-radius: 25px;
  width: 50px;
  height: 50px;
  transition: all 0.3s;
  gap: 12px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0,0,0,0.5) inset;
  z-index: 500;

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

  @media (max-width: 600px) {
    top: 17px;
  }
`;

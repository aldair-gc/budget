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
  backdrop-filter: blur(10px);
  z-index: 10;
`;

export const DoubleWideBox = styled.div`
  display: flex;
  min-width: 200%;
  height: 450px;
  background: #fff;
  box-shadow: 0 0 20px rgba(0,0,0,0.8);
  transform: translateX(25%);
  transition: all 0.3s;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  padding: 20px;
  gap: 20px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
  }

  label {
    font-size: 13px;
  }

  input {
    padding: 5px;
  }

  input[type=submit] {
    padding: 10px;
    width: 200px;
    margin: 10px auto;
  }

  .input-message {
    color: #a00;
    text-align: right;
    font-size: 13px;
  }

  h2 {
    cursor: pointer;
  }
`;

export const UserButton = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: end;
  jutify-content: baseline;
  padding: 10px;
  top: 20px;
  right: 20px;
  background: #aca;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  transition: all 0.3s;
  gap: 10px;
  overflow: hidden;
  box-shadow: 0 0 2px rgba(0,0,0,0.8);
  z-index: 500;

  #user-icon {
    font-size: 20px;
    flex: 0 0 auto;
  }

  h3 {
    text-align: center;
    background: #dfd;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    width: 140px;
    font-size: 15px;
  }

  h3:hover {
    background: #efe;
  }

  h3:active {
    background: #fff;
  }

`;

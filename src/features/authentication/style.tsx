import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 450px;
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
  width: 50%;
  padding-bottom: 10px;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
  }

  h2 { padding: 15px; }

  label {
    font-size: 13px;
  }

  input {
    border: 1px solid #555;
    border-radius: 5px;
    padding: 5px;
  }

  input[type=submit] {
    padding: 5px;
    width: 60%;
    margin: 10px auto;
    background: #ddd;
    color: #555;
  }

  small {
    color: #a00;
    text-align: right;
    font-size: 13px;
    height: 20px;
  }

  small:last-child {
    position: absolute;
    bottom: 5px;
    text-align: center;
  }

  h3 {
    position: absolute;
    bottom: 30px;
    cursor: pointer;
    font-size: 16px;
    color: #555;
  }
`;

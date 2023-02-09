import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 450px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  overflow: hidden;
`;

export const DoubleWideBox = styled.div`
  display: flex;
  height: calc(100% - 50px);
  transform: translateX(-75%);
  transition: all 0.3s;
  color: ${(props) => props.theme.general.font};
  background: ${(props) => props.theme.general.background};
`;

export const LogoContainer = styled.div`
  width: 100%;
  height: 50px;
  padding: 15px;
  font-size: 26px;
  font-weight: 600;
  color: ${(props) => props.theme.general.fontInverse};
  background: ${(props) => props.theme.general.backgroundInverse};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% / 3);
  padding-bottom: 10px;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
  }

  h2 {
    padding: 15px;
  }

  p {
    padding: 20px 40px;
    text-align: center;
  }

  label {
    font-size: 13px;
  }

  input {
    border: 1px solid ${(props) => props.theme.input.border};
    border-radius: 5px;
    padding: 5px;
  }

  input[type="submit"],
  button {
    padding: 5px;
    width: 60%;
    margin: 10px auto;
    cursor: pointer;
    color: ${(props) => props.theme.input.font};
    background: ${(props) => props.theme.input.background};
  }

  small {
    color: ${(props) => props.theme.general.fontDanger};
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
    cursor: pointer;
    font-size: 14px;
    font-weight: 300;
    color: ${(props) => props.theme.general.fontStrong};
  }
`;

import styled from "styled-components";

export const PropertiesContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(15px);
  border: 0;
  border-radius: 10px;
  min-width: 200px;
  min-height: 200px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  z-index: 51;
  overflow: hidden;
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 1px solid #aaa;
  background: #fff;
  text-align: center;
  margin-bottom: 10px;

  h1 {
    font-size: 16px;
    padding: 10px 0;
  }

  svg {
    position: absolute;
    left: 5px;
    top: 5px;
    color: #a88;

    :hover {
      color: #a00;
    }
  }
`;

export const OptionsForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  gap: 10px;
`;

export const Option = styled.div`
  display: flex;
  gap: 10px;

  > label {
    width: 120px;
    flex: 0 0 auto;
  }

  > input {
    width: 100%;
    background: none;
    border: 1px solid #aaa;
    padding: 2px 5px;
  }

  .radio {
    display: flex;
    align-items: center;
    gap: 20px;

    div {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px auto;
  gap: 20px;
  width: 100%;

  input {
    padding: 5px;
    min-width: 80px;
    border-radius: 5px;
    border: 1px solid #555;

    :hover {
      background: #28d;
      color: #fff;
    }
  }
`;

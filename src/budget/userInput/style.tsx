import styled from "styled-components";

export const OptionsForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;

  i {
    margin-top: 10px;
    align-self: center;
    width: 300px;
    text-align: center;
    font-size: 15px;
  }
`;

export const Option = styled.div`
  display: flex;
  gap: 10px;
  color: ${props => props.theme.input.font};

  > label {
    width: 120px;
    flex: 0 0 auto;
  }

  > input {
    width: 100%;
    border: 1px solid #aaa;
    padding: 2px 5px;
    color: ${props => props.theme.input.font};
    background: ${props => props.theme.input.background};
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
  margin: 10px auto 0 auto;
  gap: 20px;
  width: 100%;

  input {
    background: ${props => props.theme.button.background};
    color: ${props => props.theme.button.font};
    padding: 5px;
    min-width: 80px;
    border-radius: 5px;
    border: 1px solid #555;

    :hover {
      background: ${props => props.theme.button.backgroundHover};
    }
  }
`;

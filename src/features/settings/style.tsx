import styled from "styled-components";

export const SettingsContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

export const MenuContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;

  li {
    text-align: center;
    list-style: none;
    border: none;
    border-radius: 5px;
    padding: 5px;
    color: ${props => props.theme.button.font};
    background: ${props => props.theme.button.background};
    border: 1px solid ${props => props.theme.input.border};

    :hover {
      color: ${props => props.theme.button.fontHover};
      background: ${props => props.theme.button.backgroundHover};
    }
    :active {
      color: ${props => props.theme.button.fontActive};
      background: ${props => props.theme.button.backgroundActive};
    }
  }

  .config-item {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.input.border};
    padding: 5px;
    border-radius: 5px;
  }

  .config-item-options {
    display: flex;
    gap: 10px;
    align-items: center;

    label {
      display: flex;
      align-items: center;
      gap: 5px;
      background: ${props => props.theme.button.background};
      padding: 5px;
      border: 1px solid ${props => props.theme.input.border};
      border-radius: 5px;

      :has(input:checked) {
        color: ${props => props.theme.general.fontInverse};
        background: ${props => props.theme.general.backgroundInverse};
      }

      input { display: none; }
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
  }

  .select-if-update {
    display: flex;
    gap: 5px;
  }

  h2 { padding: 15px; }

  label {
    font-size: 13px;
  }

  input {
    border: 1px solid ${props => props.theme.input.border};
    border-radius: 5px;
    padding: 5px;
    color: ${props => props.theme.input.font};
    background: ${props => props.theme.input.background};

    :disabled {
      color: ${props => props.theme.input.fontDisabled};
      background: ${props => props.theme.input.backgroundDisabled};
    }
  }

  input[type=submit], button {
    padding: 5px;
    width: 60%;
    margin: 10px auto;
    color: ${props => props.theme.button.font};
    background: ${props => props.theme.button.background};

    :hover {
      color: ${props => props.theme.button.fontHover};
      background: ${props => props.theme.button.backgroundHover};
    }

    :active {
      color: ${props => props.theme.button.fontActive};
      background: ${props => props.theme.button.backgroundActive};
    }
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

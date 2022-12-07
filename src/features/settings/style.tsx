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

  li {
    text-align: center;
    border: 1px solid #555;
    border-radius: 5px;
    padding: 5px;
    background: #eee;

    :hover { background: #ddd; }
    :active { background: #ccc; }
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
    border: 1px solid #555;
    border-radius: 5px;
    padding: 5px;
  }

  input[type=submit], button {
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

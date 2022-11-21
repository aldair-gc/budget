import styled from "styled-components";

export const InputTitles = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;

  .title {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 50%;
    padding: 5px;
    border-radius: 10px 10px 0 0;
  }

  .input-icon {
    position: absolute;
    left: 10px;
    float: left;
  }

  h2 {
    font-size: 18px;
    font-weight: 500;
  }

  h3 {
    font-size: 16px;
    font-weight: 500;
  }

  #income-title { background: #beb; }
  #expenditure-title { background: #ebb; }
`;

export const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 10px;

  label:has(input:checked) {
    background: #aca;
  }
`;

export const InputHideable = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 0 70px;
  height: 0px;
  overflow: hidden;
  transition: all 0.3s;

  .input {
    display: flex;
    gap: 10px;
    width: 100%;
  }

  .input label {
    width: 160px;
  }

  .input input[type="text"], .input input[type="number"] {
    width: 100%;
    padding: 3px;
  }

  input[type="submit"], input[type="button"] {
    font-size: 16px;
    height: 50px;
    width: 100px;
    padding: 5px;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

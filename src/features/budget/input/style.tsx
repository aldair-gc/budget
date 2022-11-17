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
  }

  .input-icon {
    position: absolute;
    left: 10px;
    float: left;
  }

  #income-title { background: #beb; }
  #expenditure-title { background: #ebb; }
`;

export const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;

  label:has(input:checked) {
    background: #aca;
  }
`;

export const InputHideable = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
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
    width: 150px;
    padding: 5px;
    margin: 5px;
  }

  .input:first-child {
    margin-top: 20px;
  }
`;

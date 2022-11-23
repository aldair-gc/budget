import styled from "styled-components";

export const Item = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255,255,255,0.6);
  padding: 0 5px;
  margin: 5px;
  border-radius: 5px;
  height: 28px;
  width: calc(100% - 10px);
  transition: all .3s;

  :hover, :has(.show-buttons) {
    width: calc(100% - 80px);
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }


  input[type=text], input[type=number] {
    padding: 5px 2px;
    font-size: 16px;
  }

  input[type="checkbox"] {
    width: 15px;
    flex: 0 0 auto;
  }

  .description {
    width: 100%;
    text-align: left;
  }

  .value {
    text-align: right;
    width: 90px;
  }

  .expiration_day {
    width: 30px;
    text-align: center;
    flex: 0 0 auto;
  }

  .description:disabled, .value:disabled, .expiration_day:disabled {
    background: none;
    border: none;
    color: #000;
  }

  .description:enabled, .value:enabled, .expiration_day:enabled {
    background: #fff;
    border: none;
    color: #000;
  }

  .edit-item-btn {
    position: absolute;
    right: -30px;
    width: 30px;
  }

  .delete-item-btn {
    position: absolute;
    right: -60px;
    width: 30px;
  }
`;

export const ButtonsContainer = styled.div`
  position: absolute;
  right: -75px;
  display: flex;
  gap: 5px;
  padding: 0 5px 0 5px;
  width: 75px;
  border: none;
  height: 28px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    border: none;
    border-radius: 50%;
    color: #fff;
    font-size: 16px;
    height: 28px;
  }

  .edit {
    background: #44b;
    :hover { background: #33c; }
    :active { background: #22b; }
  }

  .delete {
    background: #a33;
    :hover { background: #b22; }
    :active { background: #c11; }
  }

  .save {
    background: #383;
    :hover { background: #292; }
    :active { background: #1a1; }
  }

  .confirm {
    background: #a33;
    :hover { background: #b22; }
    :active { background: #c11; }
  }

  .cancel {
    background: #44b;
    :hover { background: #33c; }
    :active { background: #22d; }
  }
`;

export const ItemBackground = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 15%;
  border-radius: 5px;
`;

import styled from "styled-components";

export const ItemContainer = styled.div`
  position: relative;
  height: 28px;
  width: 100%;
  transition: all .3s;
  overflow: hidden;
  flex: 0 0 auto;
`;

export const TransactionContainer = styled.div`
  position: relative;
  display: flex;
  gap: 5px;
  background: rgba(255,255,255,0.6);
  padding: 3px 5px;
  border-radius: 2px;
  height: 28px;
  min-height: 28px;
  width: 100%;
  overflow: hidden;

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
    background: rgba(255,255,255,.5);
    border: none;
    color: #000;
  }

  .item-opt-access {
    height: 100%;
    padding: 4px;
    width: 15px;
    flex: 0 0 auto;
    transition: all .3s;
  }
`;

export const ItemBackground = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 3px;
  transition: all .3s;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin: 0 10px;
  justify-content: center;
  top: 28px;
  gap: 5px;
  background: rgba(255,255,255,0.3);
  border: 0;
  border-radius: 2px;
  height: 28px;
  flex: 0 0 0;


  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background: rgba(255,255,255,0.7);
    border: none;
    margin: 3px;
    border-radius: 3px;
    padding: 4px 10px;
    flex: 0 0 auto;

    :hover {
      background: #28d;
      color: #fff;
    }
`;

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
  width: calc(100% - 10px);
  transition: all .3s;

  :hover, :has(.description:enabled) {
    width: calc(100% - 65px);
  }

  input[type="text"] {
    padding: 5px;
    font-size: 16px;
  }

  input[type="checkbox"] {
    width: 15px;
    flex: 0 0 auto;
  }

  .description {
    width: 100%;
    text-align: left;
    flex: 0 1 auto;
  }

  .value {
    width: 70px;
    flex: 1 0 auto;
  }

  .expiration_day {
    width: 30px;
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

export const EditButton = styled.button`
  position: absolute;
  right: -30px;
  width: 30px;
  height: 20px;
  flex: 0 0 auto;
  border: none;
  background: none;
  font-size: 20px;

  :hover { color: #00c; }
  :active { color: #000; }
`;

export const DeleteButton = styled.button`
  position: absolute;
  right: -60px;
  width: 30px;
  height: 20px;
  flex: 0 0 auto;
  border: none;
  background: none;
  font-size: 20px;

  :hover { color: #c00; }
  :active { color: #000; }
`;

export const SaveButton = styled.button`
  position: absolute;
  right: -30px;
  width: 30px;
  height: 20px;
  flex: 0 0 auto;
  border: none;
  background: none;
  font-size: 20px;

  :hover { color: #0c0; }
  :active { color: #000; }
`;

export const CancelButton = styled.button`
  position: absolute;
  right: -60px;
  width: 30px;
  height: 20px;
  flex: 0 0 auto;
  border: none;
  background: none;
  font-size: 20px;

  :hover { color: #c00; }
  :active { color: #000; }
`;

export const ItemBackground = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 15%;
  border-radius: 5px;
`;

import styled from "styled-components";

export const Item = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  list-style: none;
  background: rgba(200,255,200,0.3);
  padding: 0 5px;
  margin: 5px;
  border-radius: 5px;
  width: calc(100% - 10px);
  height: 25px;
  transition: all .3s;

  :hover {
    width: calc(100% - 65px);
  }

  input[type="text"] { font-size: 16px; }

  input[type="checkbox"] {
    width: 15px;
    flex: 0 0 auto;
  }

  .description {
    width: 50%;
    text-align: left;
    flex: 0 1 auto;
  }

  .value {
    width: 30%;
    flex: 1 0 auto;
  }

  .expiration_day {
    width: 20px;
    flex: 0 0 auto;
  }

  .description:disabled, .value:disabled, .expiration_day:disabled {
    background: none;
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

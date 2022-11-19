import styled from "styled-components";

export const MonthListContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  padding: 10px;
  background: #dea;
`;

export const MonthButtonStyle = styled.div`
  padding: 5px;
  width: 50px;
  background: #ac8;
  text-align: center;
  border-radius: 5px;
  cursor: default;

  :hover { background: #bd9}
  :active { background: #cea}

  .month-selected {
    background-color: #cea;
  }
`;

import styled from "styled-components";

export const MonthListContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  flex: 0 0 auto;
`;

export const DateSelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

export const YearButtonStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  width: 40px;
  border-radius: 5px;
  cursor: default;
  color: #ac8;

  :hover { color: #bd9}
  :active { color: #cea}
`;

export const YearMonthPickerContainer = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 270px;
  height: 100px;
  background: rgb(70,70,70);
  overflow: hidden;
  z-index: 200;

  .year-picker, .month-picker {
    position: absolute;
    display: flex;
    padding: calc(50px - 12.5px) 0;
    flex-direction: column;
    align-items: center;
    background: #ddd;
    z-index: 201;
    width: 120px;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 25px;
      width: 100%;
    }
  }

  .year-picker { left: 10px; }
  .month-picker { right: 10px; }
`;

export const PickerGlassEffect = styled.div`
  position: absolute;
  z-index: 202;
  top: 0;
  width: 120px;
  height: 100px;
  background: linear-gradient(to bottom,
    rgba(80,80,80,1) 5%,
    rgba(80,80,80,0) 36%,
    rgba(80,80,80,1) 37%,
    rgba(80,80,80,0) 38%,
    rgba(80,80,80,0) 62%,
    rgba(80,80,80,1) 63%,
    rgba(80,80,80,0) 64%,
    rgba(80,80,80,1) 95%);
`;

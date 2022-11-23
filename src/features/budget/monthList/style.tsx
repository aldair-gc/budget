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
  width: 400px;
  height: 200px;
  background: rgb(120,120,120);
  overflow: hidden;
  z-index: 200;

  .year-picker, .month-picker {
    position: absolute;
    top: calc(-50px - 24px);
    display: flex;
    gap: 5px;
    padding: 100px 0;
    flex-direction: column;
    align-items: center;
    background: #aaa;
    width: 170px;
    z-index: 201;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 19px;
      width: 100%;
    }
  }

  .year-picker { left: 20px; }
  .month-picker { right: 20px; }
`;

export const PickerGlassEffect = styled.div`
  position: absolute;
  z-index: 202;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom,
    rgba(100,100,100,1) 10%,
    rgba(100,100,100,0) 39%,
    rgba(100,100,100,1) 40%,
    rgba(100,100,100,0) 41%,
    rgba(100,100,100,0) 59%,
    rgba(100,100,100,1) 60%,
    rgba(100,100,100,0) 61%,
    rgba(100,100,100,1) 90%);
`;

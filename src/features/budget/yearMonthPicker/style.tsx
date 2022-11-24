import styled from "styled-components";

export const YearMonthPickerContainer = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  justify-content: center;
  background: rgb(150,150,150);
  overflow: hidden;
  z-index: 200;
  border-radius: 10px;

  .year-picker, .month-picker {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ddd;
    z-index: 201;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20px;
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
  background: linear-gradient(to bottom,
    rgba(150,150,150,1) 5%,
    rgba(150,150,150,0) 28%,
    rgba(150,150,150,1) 29%,
    rgba(150,150,150,0) 30%,
    rgba(150,150,150,0) 70%,
    rgba(150,150,150,1) 71%,
    rgba(150,150,150,0) 72%,
    rgba(150,150,150,1) 95%);
`;

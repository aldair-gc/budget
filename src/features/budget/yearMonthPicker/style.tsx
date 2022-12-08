import styled from "styled-components";

export const YearMonthPickerContainer = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  justify-content: center;
  background: #aaa;
  overflow: hidden;
  z-index: 200;
  border-radius: 10px;

  .border-effect {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5) inset;
    z-index: 204;
  }

  .year-picker, .month-picker {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    z-index: 201;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    transition: all .3s;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20px;
      width: 100%;
      color: #333;
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
    rgba(200,200,200,1) 0%,
    rgba(200,200,200,0) calc(50% - 11px),
    rgba(100,100,100,1) calc(50% - 10px),
    rgba(100,100,100,0) calc(50% - 9px),
    rgba(100,100,100,0) calc(50% + 9px),
    rgba(100,100,100,1) calc(50% + 10px),
    rgba(200,200,200,0) calc(50% + 11px),
    rgba(200,200,200,1) 100%);
`;

export const PickerFrontGlass = styled.div`
  position: absolute;
  z-index: 210;
  top: 0;
`;

export const SideButtons = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  gap: 5px;
  z-index: 211;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 0px solid #555;
    border-radius: 50%;
    color: #555;
    font-size: 15px;
    background: #fff;

    @media (max-width: 600px) {
      font-size: 20px;
      width: 30px;
      height: 30px;
    }
  }

  button:hover {color: #777; }
  button:active {color: #999; }
`;

import styled from "styled-components";

export const YearMonthPickerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #aaa;
  overflow: auto;
  z-index: 200;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0,0,0,0.5) inset;

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
    display: flex;
    height: 100%;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    background: #fff;
    z-index: 201;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    transition: all .3s;
    scroll-snap-type: y mandatory;
    background: linear-gradient(to bottom,
      rgba(80,80,80,0.5) 0%,
      rgba(255,255,255,1) calc(50% - 10px),
      rgba(255,255,255,1) calc(50% + 10px),
      rgba(80,80,80,0.5) 100%);
    -ms-overflow-style: none;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20px;
      width: 100%;
      color: rgb(80,80,80);
      scroll-snap-align: center;
      scroll-snap-stop: always;
    }
  }
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
    border: none;
    border-radius: 50%;
    color: #777;
    font-size: 15px;
    background: #fff;

    @media (max-width: 600px) {
      font-size: 20px;
      width: 30px;
      height: 30px;
    }
  }

  button:hover {color: #888; }
  button:active {color: #999; }
`;

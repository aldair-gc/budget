import styled from "styled-components";

export const YearMonthPickerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: ${props => props.theme.general.background};
  z-index: 200;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5) inset;

  .year-picker, .month-picker {
    height: 100%;
    overflow: hidden;
    z-index: 201;
    transition: all .3s;
    perspective: 200px;

    p {
      position: absolute;
      top: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20px;
      width: 100%;
      backface-visibility: hidden;
      color: ${props => props.theme.picker.font};
      // background: ${props => props.theme.general.backgroundWeak};
    }
  }
`;

// export const cylinderContainer = styled.div.attrs(({props: {}}))

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
    color: ${props => props.theme.picker.button};
    font-size: 15px;
    background: rgba(0,0,0,0);

    @media (max-width: 600px) {
      font-size: 20px;
      width: 30px;
      height: 30px;
    }
  }

  button:hover {color: ${props => props.theme.picker.buttonHover}; }
  button:active {color: ${props => props.theme.picker.buttonActive}; }
`;

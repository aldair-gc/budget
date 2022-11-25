import styled from "styled-components";

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  min-height: 55px;
  margin-bottom: 10px;

  h1 {
    padding: 10px;
    text-align: Left;
    font-size: 30px;
    flex: 1 0 0;
    color: #333;
  }
`;

export const DateHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  .this-container {
    position: relative;

    .this-month {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 20px;
    }

    .this-bar {
      position: absolute;
      top: 0px;
      left: 25px;
      background: #000;
      width: 1px;
      height: 30px;
      rotate: 0deg;
    }

    .this-year {
      position: absolute;
      font-size: 15px;
      top: 10px;
      left: 30px;
    }
  }
`;

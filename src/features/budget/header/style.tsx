import styled from "styled-components";

export const HeaderContainer = styled.div`
  position: relative;

  h1 {
    padding: 10px;
    text-align: center;
    font-size: 30px;
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

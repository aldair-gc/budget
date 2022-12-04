import styled from "styled-components";

export const TotalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;

  > div {
    display: flex;
    gap: 10px;
  }
`;

export const TotalsLine = styled.div`
  position: relative;
  width: 50%;
  height: 35px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
`;

export const TotalsNumbers = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 5px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 10px;
  z-index: 2;
  color: #444;
  box-shadow: 0 0 5px rgba(0,0,0,0.5) inset;
`;

export const LineGraph = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: all .3s;
  z-index: 0;
`;

export const TotalsEstimation = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  background: #eee;
  height: 75px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0,0,0,0.5) inset;
  flex: 1 0 0;

  h3 {
    @media (max-width: 600px) {
      font-size: 14px;
      z-index: 2;
    }
  }

  h2 {
    @media (max-width: 600px) {
      font-size: 16px;
      z-index: 2;
    }
  }
  svg {
    @media (max-width: 600px) {
      position: absolute;
      width: 80%;
      height: 80%;
      color: #ccc;
      z-index: 1;
    }
  }
`;

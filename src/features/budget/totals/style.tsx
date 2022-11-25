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
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #eee;
  height: 50px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0,0,0,0.5) inset;
  flex: 1 0 0;
`;

export const CurrentBalance = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #eee;
  height: 50px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0,0,0,0.5) inset;
  flex: 1 0 0;
`;

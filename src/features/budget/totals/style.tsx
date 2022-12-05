import styled from "styled-components";

export const TotalsContainer = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 10px;
`;

export const TotalsLineContainer = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  flex: 0 0 auto;
  background: #ddd;
  border-radius: 5px;
  overflow: hidden;
`;

export const TotalsNumbers = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 5px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 10px;
  z-index: 2;
  color: #444;
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
  justify-content: center;
  background: #ccc;
  height: 75px;
  padding: 5px;
  border-radius: 5px;
  flex: 1 0 0;

  h3 {
    z-index: 2;
    font-size: 16px;
  }

  h2 {
    z-index: 2;
    font-size: 16px;
  }

  svg {
    position: absolute;
    width: 80%;
    height: 80%;
    color: #ddd;
    z-index: 1;
  }
`;

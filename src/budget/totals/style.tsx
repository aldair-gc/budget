import styled from "styled-components";

export const TotalsContainer = styled.div`
  display: flex;
  flex: 0;
  height: 50px;
  gap: 10px;
`;

export const TotalsLineContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  flex: none;
  background: #ddd;
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
  z-index: 2;
  color: #444;

  p:first-child { width: 40%}
  p:nth-child(2) { width: 20%; text-align: center; }
  p:last-child { width: 40%; text-align: right; }
`;

export const TotalsEstimation = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ddd;
  height: 100%;
  padding: 5px;
  border-radius: 5px;
  flex: 0 1 33%;

  h3 {
    z-index: 2;
    font-size: 18px;
  }

  h2 {
    z-index: 2;
    font-size: 20px;
  }

  @media (max-width: 600px) {
    h3, h2 {
      z-index: 2;
      font-size: 16px;
    }
  }

  svg {
    position: absolute;
    width: 80%;
    height: 80%;
    color: #eee;
    z-index: 1;
  }

  :hover i { display: block; }

  i {
    position: absolute;
    display: none;
    bottom: calc(100% + 5px);
    z-index: 5;
    text-align: center;
    background: #eea;
    border: 2px dotted #555;
    border-radius: 10px;
    padding: 5px;

    :after {
      position: absolute;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      bottom: -7px;
      height: 10px;
      width: 10px;
      content: "";
      background: #eea;
      border-bottom: 2px dotted #555;
      border-right: 2px dotted #555;
    }
  }
`;
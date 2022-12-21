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
  background: ${props => props.theme.list.background};
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
  color: ${props => props.theme.general.font};

  p:first-child { width: 40%}
  p:nth-child(2) { width: 20%; text-align: center; }
  p:last-child { width: 40%; text-align: right; }
`;

export const TotalsEstimation = styled.div.attrs((props: {result: boolean}) => props)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.general.background};
  height: 100%;
  border-radius: 5px;
  flex: 0 1 33%;
  color: ${props => props.theme.general.font};

  h3 {
    z-index: 2;
    font-size: 18px;
    flex: 1;
    max-height: 50%;
    overflow: hidden;
  }

  h2 {
    z-index: 2;
    font-size: 20px;
    flex: 1;
    color: ${props => props.result ? props.theme.general.fontGoodResult : props.theme.general.fontBadResult};
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
    color: ${props => props.theme.general.backgroundStrong};
    z-index: 1;
  }

  :hover i { display: block; }

  i {
    position: absolute;
    display: none;
    bottom: calc(100% + 7px);
    z-index: 5;
    text-align: center;
    background: ${props => props.theme.general.backgroundWeak};
    color: ${props => props.theme.general.fontStrong};
    border-radius: 10px;
    padding: 5px;

    :after {
      position: absolute;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      bottom: -5px;
      height: 10px;
      width: 10px;
      content: "";
      background: ${props => props.theme.general.backgroundWeak};
    }
  }
`;

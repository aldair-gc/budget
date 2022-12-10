import styled from "styled-components";

export const WindowContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: ${props => props.theme.general.font};
  background: ${props => props.theme.general.background};
  border: 0;
  border-radius: 10px;
  min-width: 200px;
  min-height: 200px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  z-index: 951;
  overflow: hidden;
`;

export const WindowHeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid #aaa;
  color: ${props => props.theme.general.fontInverse};
  background: ${props => props.theme.general.backgroundInverse};
  height: 40px;

  h1 { font-size: 18px; }

  button {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    background: none;
    border: none;
  }

  svg {
    color: ${props => props.theme.general.fontInverse};
    width: 100%;
    height: 100%;

    :hover { color: ${props => props.theme.general.backgroundStrong}; }
  }
`;

export const WindowBodyContainer = styled.div.attrs((props: {width: string, height: string}) => props)`
  width: ${props => props.width};
  height: ${props => props.height};
`;

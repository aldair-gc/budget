import styled from "styled-components";

export const WindowContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: #fff;
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
  width: 100%;
  border-bottom: 1px solid #aaa;
  background: #fff;
  text-align: center;

  h1 {
    font-size: 16px;
    padding: 10px 0;
  }

  svg {
    position: absolute;
    left: 5px;
    top: 5px;
    color: #a88;

    :hover {
      color: #a00;
    }
  }
`;

export const WindowBodyContainer = styled.div.attrs((props: {width: string, height: string}) => props)`
  width: ${props => props.width};
  height: ${props => props.height};
`;

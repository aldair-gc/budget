import styled from "styled-components";

export const HelpContainer = styled.ul`
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: auto;

  h1 { font-size: 16px; }
  h2 {
    font-size: 16px;
    background: ${props => props.theme.general.backgroundWeak};
    padding: 5px;
  }
  p {
    padding: 5px;
  }
  li {
    overflow: hidden;
    margin-top: 10px;
    color: ${props => props.theme.general.font};
    background: ${props => props.theme.general.background};
    border-radius: 5px;
  }
`;

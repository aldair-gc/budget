import styled from "styled-components";

export const HelpContainer = styled.ul`
  width: 100%;
  height: 100%;
  h1 { font-size: 18px; }
  li {
    color: ${props => props.theme.general.font};
    background: ${props => props.theme.general.backgroundWeak};
  }
`;

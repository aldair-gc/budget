import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  background: ${props => props.theme.general.backgroundStrong};
  `;

export const Delimiter = styled.div`
  max-width: 1200px;
`;

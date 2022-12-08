import styled from "styled-components";

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex: 0;
  height: 50px;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const MainTitleContainer = styled.h1`
  font-size: 30px;
  color: #555;
  flex: 1;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

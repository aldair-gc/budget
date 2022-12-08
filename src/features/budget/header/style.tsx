import styled from "styled-components";

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-height: 50px;
  margin-bottom: 10px;
  flex: 0;
`;

export const MainTitleContainer = styled.h1`
  font-size: 30px;
  color: #555;
  flex: 1;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

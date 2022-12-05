import styled from "styled-components";

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-height: 55px;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    margin-bottom: 5px;
  }
`;

export const MainTitleContainer = styled.h1`
  position: absolute;
  top: 10px;
  left: 0;
  font-size: 30px;
  color: #555;

  @media (max-width: 600px) {
    top: 19px;
    font-size: 22px;
  }
`;

import styled from "styled-components";

export const RightClickMenuContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(5px);
  border: 0;
  border-radius: 5px;
  padding: 5px;
  min-width: 140px;
  min-height: 10px;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
  z-index: 50;
`;

export const MenuOption = styled.button`
  text-align: left;
  width: 100%;
  border: 0;
  border-radius: 3px;
  padding: 4px 5px;
  background: none;

  :hover {
    background: #28d;
    color: #fff;
  }
`;

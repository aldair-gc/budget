import styled from "styled-components";

export const ListContainer = styled.div`
  position: relative;
  width: 50%;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
`;

export const ItemList = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background: rgba(0,0,0,0.2);
  padding: 5px;
  gap: 5px;
  z-index: 5;
`;

export const ListBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  transition: all .3s;
`;

import styled from "styled-components";

export const ListContainer = styled.div`
  position: relative;
  height: 100%;
  width: 50%;
`;

export const ItemList = styled.div`
  position: absolute;
  height: 100%;
  overflow: hidden auto;
  background: rgba(0,0,0,0.2);
  z-index: 5;
`;

export const ListBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 50px;
  right: 50px;
  z-index: 2;
  transition: all .3s;
`;

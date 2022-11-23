import styled from "styled-components";

export const ListContainer = styled.div`
  position: relative;
  height: 100%;
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
  height: 100%;
  overflow: hidden auto;
  background: rgba(0,0,0,0.2);
  z-index: 5;
`;

export const ListBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0px;
  right: 0px;
  z-index: 2;
  transition: all .3s;
`;

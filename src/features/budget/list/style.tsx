import styled from "styled-components";

export const Evidence = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.1);
  backdrop-filter: blur(5px);
  z-index: 50;
`;

export const ListInputContainer = styled.form`
  position: absolute;
  top: 35px;
  left: 0;
  right: 0;
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(10px);
  z-index: 200;
  transition: all 0.3s;
  height: 0px;
  overflow: hidden;
  margin: 0 10px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
`;

export const ListContainer = styled.div`
  position: relative;
  width: 50%;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
`;

export const ItemList = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow-y: auto;
  background: rgba(0,0,0,0.2);
  padding: 5px;
  gap: 5px;
  z-index: 5;
`;

export const ListBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  transition: all .3s;
`;

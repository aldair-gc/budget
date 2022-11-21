import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
`;

export const List = styled.div`
  position: relative;
  width: 50%;
  background: #ccc;
  border-radius: 5px;
  overflow: hidden;
`;

export const Numbers = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 5px;
  font-weight: 600;
  z-index: 2;
`;

export const Graph = styled.div`
  position: absolute;
  background: #3a4;
  top: 0;
  left: 0;
  height: 100%;
  transition: all .3s;
  z-index: 0;
`;

export const Estimated = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ccc;
  height: 50px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0,0,0,0.5) inset;
`;

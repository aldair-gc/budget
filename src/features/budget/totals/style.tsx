import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  overflow: hidden;
`;

export const List = styled.div`
  position: relative;
  width: 50%;
  height: 30px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
`;

export const Numbers = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 5px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 10px;
  z-index: 2;
  color: #444;
  box-shadow: 0 0 5px rgba(0,0,0,0.5) inset;
`;

export const Graph = styled.div`
  position: absolute;
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
  background: #eee;
  height: 50px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0,0,0,0.5) inset;
`;

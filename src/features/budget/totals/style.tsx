import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
`;

export const List = styled.div`
  position:relative;
  width: 50%;
  border: 1px solid #000;
`;

export const Numbers = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  color: #000;
  padding: 0 5px;
`;

export const Graph = styled.div`
  position: absolute;
  background: rgba(20,20,20,0.3);
  top: 0;
  left: 0;
  height: 100%;
  transition: all .3s;
`;

export const Estimated = styled.div`
  display: flex;
  background: #ade;
  height: 50px;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

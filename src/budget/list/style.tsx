import styled from "styled-components";

export const Evidence = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  height: 100%;
  width: 100%;
  background: ${props => props.theme.general.layer};
  backdrop-filter: blur(5px);
  z-index: 50;
`;

export const ListInputContainer = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  right: 0;
  background: ${props => props.theme.input.background};
  backdrop-filter: blur(10px);
  z-index: 200;
  transition: all 0.3s;
  height: 0px;
  overflow: hidden;
  margin: 0 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
`;

export const ListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  z-index: 3;
`;

export const ItemList = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow-y: auto;
  background: ${props => props.theme.list.backgroundWeak};
  backdrop-filter: blur(2px);
  padding: 5px;
  gap: 5px;
  z-index: 5;
  opacity: 1;
`;

export const ListBackground = styled.div.attrs((props: {height: number, loading: boolean, type: string}) => props)`
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  z-index: 2;
  transition: all .3s;
  width: ${props => props.height}%;
  background: ${props => props.loading ?
    props.theme.general.background :
    props.type === "income" ?
      props.theme.income.hard :
      props.theme.expenditure.hard};
`;

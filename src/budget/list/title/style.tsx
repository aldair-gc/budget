import styled from "styled-components";

export const InputTitles = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding: 5px 10px;
  font-size: 16px;
  background: rgba(0,0,0,0.3);
  z-index: 6;

  h2 {
    font-size: 18px;
    font-weight: 500;
    text-transform: capitalize;
  }

  .title-icons {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 25px;
    padding: 5px;
    transition: all .3s;

    :hover { color: #eee }
  }
`;

export const SortContainer = styled.div`
position: absolute;
top: 100%;
right: 5px;;
display: none;
flex-direction: column;
background: rgba(255,255,255,0.6);
backdrop-filter: blur(5px);
border: 0;
border-radius: 5px;
padding: 5px;
min-width: 100px;
min-height: 10px;
box-shadow: 0 0 10px rgba(0,0,0,0.5);
z-index: 7;
`;

export const SortOption = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: left;
  width: 100%;
  border: 0;
  border-radius: 3px;
  padding: 4px 5px;
  background: none;
  font-size: 15px;

  :hover {
    background: #28d;
    color: #fff;
  }
`;
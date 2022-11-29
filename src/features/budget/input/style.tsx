import styled from "styled-components";

export const InputTitles = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;

  .list-title {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 50%;
    padding: 5px 10px;
    border-radius: 10px 10px 0 0;
    font-size: 16px;
  }

  h2 {
    font-size: 18px;
    font-weight: 500;
  }

  label, .sorter-icon-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 25px;

    i {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 20;
    }
  }

  #income-title { background: #beb; }
  #expenditure-title { background: #ebb; }
`;

export const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

export const InputHideable = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 0 40px;
  height: 0px;
  overflow: hidden;
  transition: all 0.3s;

  .inputs {
    display: flex;
    width: 100%;
    gap: 10px;
  }

  .input-column {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .input-column:first-child {
    width: 100%;
  }

  .input-column:last-child {
    min-width: 180px;
  }

  .input {
    display: flex;
    gap: 5px;
    width: 100%;
    flex: 1 0 auto;
  }

  .input label {
    flex: 0 0 content;
  }

  .input input[type="text"], .input input[type="number"] {
    padding: 3px;
    flex: 1 0 auto;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input[type="submit"], input[type="button"] {
    font-size: 16px;
    height: 30px;
    width: 100px;
    padding: 5px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
  }
`;

export const SortContainer = styled.div`
position: absolute;
top: 100%;
right: 0;
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
z-index: 50;
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

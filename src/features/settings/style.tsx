import styled from "styled-components";

export const SettingsContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

export const MenuContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    text-align: center;
    border: 1px solid #555;
    border-radius: 5px;
    padding: 5px;
    background: #eee;

    :hover { background: #ddd; }
    :active { background: #ccc; }
  }
`;

import styled from "styled-components";

export const UserContainer = styled.div`
  position: absolute;
  z-index: 500;
  top: 10px;
  right: 10px;

  @media (max-width: 600px) {
    top: 10px;
    right: 10px;
  }
`;

export const UserButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 10px;
  background: ${props => props.theme.general.backgroundWeak};
  border-radius: 25px;
  width: 50px;
  height: 50px;
  transition: all 0.3s;
  gap: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0,0,0,0.5) inset;

  @media (max-width: 600px) {
    gap: 20px;
  }

  .opened {
    width: 200px;
    @media (max-width: 660px) { width: 310px; }
  }

  #user-icon {
    font-size: 30px;
    flex: 0 0 auto;
    color: ${props => props.theme.general.fontWeak};
  }

  button {
    text-align: center;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    border: none;
    color: ${props => props.theme.general.font};
    background: ${props => props.theme.button.background};

    :hover { background: ${props => props.theme.button.backgroundHover}; }
    :active { background: ${props => props.theme.button.backgroundActive}; }
  }

`;

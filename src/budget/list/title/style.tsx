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
  background: ${(props) => props.theme.list.backgroundInverse};
  backdrop-filter: blur(20px);
  z-index: 6;

  h2 {
    font-size: 18px;
    font-weight: 500;
    color: ${(props) => props.theme.general.fontStrong};
  }

  .title-icons {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 25px;
    padding: 5px;
    transition: all 0.3s;
    color: ${(props) => props.theme.general.fontStrong};

    :hover {
      color: ${(props) => props.theme.button.font};
    }
  }
`;

export const SortContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 5px;
  display: none;
  flex-direction: column;
  border: none;
  border-radius: 5px;
  padding: 5px;
  min-width: 100px;
  min-height: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 10;
  background: ${(props) => props.theme.general.backgroundStrong};
`;

export const SortOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  text-align: left;
  width: 100%;
  border: 0;
  border-radius: 3px;
  background: none;
  font-size: 15px;
  padding: 2px;
  color: ${(props) => props.theme.general.font};

  svg {
    width: 30px;
    height: 30px;
    padding: 5px;
    color: ${(props) => props.theme.general.fontWeak};

    border-radius: 3px;
    border: 1px solid ${(props) => props.theme.input.border};

    @media (max-width: 600px) {
      width: 35px;
      height: 35px;
      padding: 7px;
    }
  }

  @media (max-width: 600px) {
    padding: 3px;
  }

  svg:hover {
    color: ${(props) => props.theme.general.fontInverse};
    background: ${(props) => props.theme.general.backgroundInverse};
  }
`;

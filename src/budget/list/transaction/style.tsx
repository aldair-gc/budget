import styled from "styled-components";

export const ItemContainer = styled.div.attrs((props: {selected: boolean}) => props)`
  position: relative;
  height: ${props => props.selected ? "56px" : "28px"};
  transition: all .3s;
  overflow: hidden;
  flex: none;

  @media (max-width: 600px) {
    height: ${props => props.selected ? "72px" : "36px"};
  }
`;

export const TransactionContainer = styled.div.attrs((props: {highlight: string}) => props)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  background: ${props => props.highlight === "danger"
    ? props.theme.transaction.dangerBackground :
    props.highlight === "warning" ?
      props.theme.transaction.warningBackground:
      props.theme.transaction.background};
  padding: 3px 5px;
  border-radius: 2px;
  height: 28px;
  min-height: 28px;
  overflow: hidden;
  color: ${props => props.theme.transaction.font};

  @media (max-width: 600px) {
    height: 36px;
    min-height: 36px;
  }

  :has(input:checked) {
    .description, .value, .expiration_day {
      text-decoration-line: line-through;
      color: ${props => props.theme.general.fontInverse};
    }
    background: ${props => props.theme.transaction.background};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  input[type=text], input[type=number] {
    padding: 5px 2px;
    font-size: 16px;
  }

  input[type="checkbox"] {
    flex: 1 0 auto;
  }

  .description {
    width: 100%;
    flex: 1 1 auto;
  }

  .value {
    text-align: right;
    width: 100px;
    flex: 1 1 content;
  }

  .expiration_day {
    width: 30px;
    text-align: center;
    flex: 1 0 auto;
  }

  .description:disabled, .value:disabled, .expiration_day:disabled {
    background: none;
    border: none;
    -webkit-text-fill-color: ${props => props.theme.transaction.font};
    -webkit-opacity: 1;
    opacity: 1;
  }

  .description:enabled, .value:enabled, .expiration_day:enabled {
    background: rgba(${props => props.theme.transaction.backgroundEnabled});
    border: none;
    border-bottom: 1px solid ${props => props.theme.input.borderFocus};
  }

  .item-opt-access {
    height: 100%;
    padding: 4px;
    width: 15px;
    flex: 0 0 auto;
    transition: all .3s;

    @media (max-width: 600px) {
      width: 18px;
    }
  }
`;

export const ItemBackground = styled.div.attrs((props: {width: number, type: "income" | "expenditure"}) => props)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${props => props.width}%;
  left: 0;
  height: 3px;
  transition: all .3s;
  background: ${props => props.type === "income" ? props.theme.income.soft : props.theme.expenditure.soft};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin: 0 10px;
  justify-content: center;
  top: 28px;
  gap: 5px;
  background: ${props => props.theme.transaction.buttonContainerBackground};
  border: 0;
  border-radius: 2px;
  height: 28px;
  flex: 0 0 0;

  @media (max-width: 600px) {
    top: 36px;
    height: 36px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border: none;
    margin: 3px;
    border-radius: 3px;
    padding: 4px 10px;
    flex: 0 0 auto;
    color: ${props => props.theme.transaction.font};
    background: ${props => props.theme.transaction.buttonBackground};

    :hover {
      background: ${props => props.theme.transaction.buttonBackgroundHover};
    }

    @media (max-width: 600px) {
      font-size: 16px;
    }
`;

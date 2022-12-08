import styled from "styled-components";

export const BudgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  height: inherit;
`;

export const BudgetListsContainer = styled.div`
  display: flex;
  flex: auto;
  gap: 10px;
  height: calc(100% - 150px);

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

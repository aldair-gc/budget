import styled from "styled-components";

export const BudgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  height: 100%;
  max-width: 1200px;
  margin: auto;
`;

export const BudgetListsContainer = styled.div`
  display: flex;
  flex: auto;
  gap: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

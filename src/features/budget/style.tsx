import styled from "styled-components";

export const BudgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

export const BudgetListsContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    height: 100%;
    flex: 0 1 auto;
  }
`;

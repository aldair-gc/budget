import styled from "styled-components";

export const BudgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const BudgetListsContainer = styled.div`
  display: flex;
  height: 50%;
  gap: 10px;
  flex: auto;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

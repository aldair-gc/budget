import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    width: 800px;
    max-width: 100vw;
    height: 800px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    overflow: hidden;

    @media (max-width: 600px) {
      height: 100%;
      width: 100vw;
      border-radius: 0;
    }
`;

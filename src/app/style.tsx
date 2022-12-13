import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    max-width: 1200px;
    background: ${props => props.theme.general.backgroundStrong};
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
`;

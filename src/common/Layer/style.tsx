import styled from "styled-components";

export const LayerContainer = styled.div`
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
background: ${props => props.theme.general.layer};
backdrop-filter: blur(2px);
z-index: 950;
`;

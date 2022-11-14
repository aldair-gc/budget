import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #aaa;
}
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 700px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
`;

import { createGlobalStyle } from "styled-components";

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

@media (max-width: 600px) {
  #root {
    height: 100%;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-user-select: none;
  user-select: none;
}

input {
  font-size: 16px;
}

body {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #aaa;
  touch-action: none;

  @media (max-width: 600px) {
    background: #fff;
    height: 100vh;
  }
}

.hidden {
  display: none;
}

.transparent {
  visibility: hidden;
}
`;

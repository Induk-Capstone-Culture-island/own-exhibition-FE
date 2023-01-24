import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
@import url("//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css");
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');


${reset}

* {
  box-sizing :border-box;
  
}

body {
  /* font-family: "Spoqa Han Sans Neo", "sans-serif"; */
  /* font-family: 'Noto Sans KR', sans-serif; */
  background-color: ${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  
}

a {
  text-decoration : none;
  color: inherit;
}
`;

export default GlobalStyle;

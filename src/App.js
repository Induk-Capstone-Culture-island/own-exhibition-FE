import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Login from "./pages/Login";
import MyPage from "./pages/Mypage";
import UpdateInfo from "./components/Auth/UpdateInfo";
import UpdatePw from "./components/Auth/UpdatePw";
import GlobalStyle from "./styles/GlobalStyle";
import Register from "./pages/Register";
import FindPw from "./components/Auth/FindPw";
import Header from "./components/Header";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import Detail from "./pages/Detail";
import { darkTheme, lightTheme } from "./styles/theme";
import ScrollToTop from "./hooks/ScrollToTop";
import icon from "./assets/img/darkmode.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLightAtom } from "./atoms/heartAtom";

function App() {
  const isLight = useRecoilValue(isLightAtom);
  const setLightAtom = useSetRecoilState(isLightAtom);
  const toggleDark = () => setLightAtom((prev) => !prev);
  return (
    <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
      <Toggle onClick={toggleDark}>
        <ToggleIcon />
      </Toggle>
      <BrowserRouter>
        <ScrollToTop />
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/findPw" element={<FindPw />}></Route>
          <Route path="/mypage/updateinfo" element={<UpdateInfo />}></Route>
          <Route path="/mypage/updatepw" element={<UpdatePw />}></Route>
          <Route path="/exhibition/:id" element={<Detail />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const Toggle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 0 10px 10px 0;
  border-radius: 50%;
  border: none;
  background-color: #353638;
  width: 35px;
  height: 35px;
  @media screen and (min-width: 1920px) {
    margin: 0 15px 100px 0;
  }
`;

const ToggleIcon = styled.img.attrs({
  src: `${icon}`,
})`
  padding: 5px;
  width: 35px;
  height: 35px;
`;

export default App;

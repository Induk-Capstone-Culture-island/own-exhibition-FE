import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import Logout from "./Auth/Logout";
import { UserOutlined, ExportOutlined } from "@ant-design/icons";
import LogoBlack from "../assets/img/logo_black.svg";
import LogoWhite from "../assets/img/logo_white.svg";
import { useRecoilValue } from "recoil";
import { isLightAtom } from "../atoms/heartAtom";

function Header() {
  const loginMatch = useMatch("/");
  const registerMatch = useMatch("/register");
  const findPwMatch = useMatch("/findpw");
  const mainMatch = useMatch("/main");
  const isLight = useRecoilValue(isLightAtom);

  const accessToken = localStorage.getItem("token");

  // const onLogout = () => {
  //   localStorage.clear();
  //   navigate("/");
  //   axios
  //     .post("http://13.125.82.62/api/logout/", {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.log("로그아웃 실패", error);
  //     });
  // };

  return loginMatch !== null ||
    registerMatch !== null ||
    findPwMatch !== null ? null : (
    <StyledHeader>
      <Link to="/main">
        <StyledLogo isActive={mainMatch !== null}>
          <HeaderLogo
            src={isLight !== true || mainMatch ? LogoWhite : LogoBlack}
          />
        </StyledLogo>
      </Link>
      <HeaderRight isActive={mainMatch !== null}>
        <Link to="/Mypage">
          <UserOutlined className="mypage" />
        </Link>
        <ExportOutlined onClick={Logout} className="logout" />
      </HeaderRight>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  position: absolute;
  justify-content: space-between;
  width: 100%;
  margin-top: 34px;
  margin-bottom: 33px;
`;

const HeaderLogo = styled.img`
  display: flex;
  width: 110px;
  margin-left: 12px;
  align-items: center;
  text-align: center;
`;

const StyledLogo = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR&display=swap");
  display: flex;
  margin-left: 50px;
`;

const HeaderRight = styled.div`
  display: flex;
  margin-right: 50px;
  column-gap: 22px;
  color: ${(props) =>
    props.isActive ? props.theme.bgColor : props.theme.textColor};

  .mypage {
    font-size: 24px;
    cursor: pointer;

    &:hover {
      color: #bbbbbb;
    }
  }
  .logout {
    font-size: 24px;
    cursor: pointer;
    &:hover {
      color: #bbbbbb;
    }
  }
`;

export default Header;

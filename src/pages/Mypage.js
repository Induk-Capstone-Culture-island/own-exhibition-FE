import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import user from "../assets/img/user.png";
import Wishlist from "../components/Wishlist";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

function MyPage() {
  const [data, setData] = useState([]);
  const [wish, setWish] = useState([]);
  const accessToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const EditInfo = () => {
    navigate("/mypage/updateinfo");
  };
  const ChangePw = () => {
    navigate("/mypage/updatepw");
  };

  const getData = async () => {
    const json = await axios(`http://13.125.82.62/api/userinfo/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setData(json.data.user);
  };

  const getWish = async () => {
    const json = await axios(`http://13.125.82.62/api/userinfo/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setWish(json.data.wish);
  };

  useEffect(() => {
    getData();
    getWish();
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <Helmet>
        <title>마이페이지</title>
      </Helmet>
      <MyPageBox>
        <ProfileBox>
          <div className="profile">
            <img src={user} alt="profile"></img>
          </div>
          <div className="info">
            <h3>{data.name}</h3>
            <p>{data.email}</p>
          </div>
          <div className="button">
            <EditProfile onClick={EditInfo}>내 정보 수정</EditProfile>
            <EditPassword onClick={ChangePw}>비밀번호 변경</EditPassword>
          </div>
        </ProfileBox>
        <WishlistBox>
          <WishlistHeader>
            <h3>찜한 전시({wish.length})</h3>
            <div className="rightSide">
              <CaretLeftOutlined className="leftArrow" />
              <span>1/1</span>
              <CaretRightOutlined className="rightArrow" />
            </div>
          </WishlistHeader>
          <div>
            {wish.map((wish, i) => (
              <Wishlist key={i} id={wish.exhibition_id} />
            ))}
          </div>
        </WishlistBox>
      </MyPageBox>
    </Container>
  );
}

const Container = styled.div`
  @media screen and (max-width: 1800px) {
    padding: 100px 0 78px 0;
  }
  @media screen and (max-width: 1920px) {
    padding: 100px 0 130px 0;
  }
`;

const MyPageBox = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 80px;
`;

const ProfileBox = styled.div`
  background-color: #34353a;
  border-radius: 10px;
  width: 350px;
  height: 400px;
  margin-left: 20px;

  img {
    display: flex;
    width: 88px;
    height: 88px;
  }

  h3 {
    color: white;
    font-size: 20px;
    font-weight: bold;
  }

  p {
    color: white;
  }

  .profile {
    display: flex;
    justify-content: center;
    padding: 80px 0 30px 0;
  }

  .info {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  .button {
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }

  .changepassword {
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }
`;

const EditProfile = styled.button`
  border-radius: 5px;
  width: 33%;
  height: 40px;
  background-color: #58a6ff;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
`;

const EditPassword = styled.button`
  border-radius: 5px;
  width: 33%;
  height: 40px;
  background-color: #58a6ff;
  border: none;
  color: white;
  font-size: 14px;
  margin-left: 10px;
  cursor: pointer;
`;

const WishlistBox = styled.div`
  background-color: #303136;
  border-radius: 10px;
  width: 700px;
  height: auto;
  margin-left: 50px;
  padding: 32px;
`;

const WishlistHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #303136;
  border-bottom: 1px solid #545454;
  height: 40px;
  margin: 0 20px;
  h3 {
    color: white;
    font-size: 18px;
    font-weight: 600;
  }
  span {
    font-size: 12px;
    line-height: 18px;
    color: #cccccc;
  }
  .leftArrow {
    font-size: 15px;
  }

  .rightArrow {
    font-size: 15px;
  }
`;

export default MyPage;

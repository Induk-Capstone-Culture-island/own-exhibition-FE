import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import user from "../../assets/img/user.png";

function UpdateInfo() {
  const [data, setData] = useState([]);
  const accessToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .put(
        "http://13.125.82.62/api/change",
        {
          name: data.name,
          birthday: data.birthday,
          phone: data.phoneNum,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/mypage");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Withdrawal = () => {
    axios
      .delete("http://13.125.82.62/api/delete/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        alert("회원탈퇴 실패");
        console.log("회원탈퇴 실패", error);
      });
  };

  const onCancle = () => {
    navigate("/mypage");
  };

  const getData = async () => {
    const json = await axios(`http://13.125.82.62/api/userinfo/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setData(json.data.user);
    console.log(json);
  };

  useEffect(() => {
    getData();
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
  }, []);

  return (
    <Container>
      <Helmet>
        <title>내 정보 수정</title>
      </Helmet>
      <MyPageBox>
        <ProfileBox>
          <Profile>
            <div className="profile">
              <img src={user} alt="user"></img>
            </div>
            <div className="info">
              <p>{data.email}</p>
            </div>
          </Profile>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
              <p>이름</p>
              <input
                {...register("name")}
                type="text"
                defaultValue={data.name}
              />
              <InputBox />
              <p>생년월일</p>
              <input
                {...register("birthday", {
                  pattern: {
                    value:
                      /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
                    message: "올바른 날짜가 아닙니다.",
                  },
                })}
                defaultValue={data.birthday}
              />
              <span>{errors?.birthday?.message}</span>
              <p>전화번호</p>
              <input
                {...register("phoneNum")}
                type="text"
                defaultValue={data.phone}
              />
              <span>{errors?.phoneNum?.message}</span>
            </InputBox>
            <WithdrawalBtn onClick={Withdrawal}>회원 탈퇴</WithdrawalBtn>
            <div>
              <button onClick={onCancle}>취소</button>
              <button>확인</button>
            </div>
          </form>
        </ProfileBox>
      </MyPageBox>
    </Container>
  );
}

const Container = styled.div`
  @media screen and (max-width: 1920px) {
    padding: 100px 0 72px 0;
  }
`;

const MyPageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 120px;
`;
const Profile = styled.div`
  background-color: #8dbeb6;
`;
const ProfileBox = styled.div`
  background-color: #303136;
  border-radius: 10px;
  width: 450px;
  height: auto;
  margin-left: 20px;
  padding-bottom: 20px;
  img {
    display: flex;
    width: 88px;
    height: 88px;
    cursor: pointer;
  }
  h3 {
    color: white;
    font-size: 20px;
    font-weight: bold;
  }
  span {
    display: flex;
    justify-content: center;
    color: red;
    font-size: 12px;
    margin-top: 10px;
  }

  p {
    color: white;
    margin: 13px;
    text-align: center;
  }
  .profile {
    display: flex;
    justify-content: center;
    padding: 50px 0 30px 0;
  }
  .info {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  button {
    display: inline-block;
    justify-content: center;
    border-radius: 2px;
    border: none;
    cursor: pointer;
    color: white;
    width: 80px;
    border-radius: 5px;
    background-color: #191919;
    text-align: center;
    margin: 4px 2px;
    padding: 5px;
    transition-duration: 0.4s;
    margin-top: 25px;
  }
  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  input {
    border: none;
    padding-bottom: 8px;
    width: 250px;
    text-align: center;
    margin-left: 100px;
  }
  button:hover {
    background-color: gray;
    color: white;
  }
`;
const InputBox = styled.div`
  width: 100%;
`;

const WithdrawalBtn = styled.button`
  border-radius: 5px;
  width: 33%;
  height: 40px;
  border: none;
  color: white;
  font-size: 14px;
  margin-left: 10px;
  cursor: pointer;
`;

export default UpdateInfo;

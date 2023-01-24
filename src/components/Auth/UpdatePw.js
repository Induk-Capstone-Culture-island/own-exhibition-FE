import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import user from "../../assets/img/user.png";

function UpdatePw() {
  const [data, setData] = useState([]);
  const accessToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const onSubmit = (data) => {
    if (data.password !== data.pwCheck) {
      setError(
        "pwCheck",
        { message: "Passwords are not the same." },
        { shouldFocus: true }
      );
    } else {
      axios
        .post(
          "http://13.125.82.62/api/changepassword",
          {
            old_password: data.oldPassword,
            password: data.password,
            confirm_password: data.pwCheck,
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
          alert("비밀번호를 다시 확인해주세요.");
          console.log(err);
        });
    }
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
              <h3>{data.name}</h3>
              <p>{data.email}</p>
            </div>
          </Profile>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
              <p>기존 비밀번호</p>
              <input
                {...register("oldPassword", {
                  required: "항목을 입력해주세요",
                  minLength: {
                    value: 8,
                    message: "8자리 이상의 비밀번호를 입력해주세요.",
                  },
                })}
                type="password"
                autoComplete="off"
              />
              <p>새 비밀번호</p>
              <input
                {...register("password", {
                  required: "항목을 입력해주세요",
                  pattern: {
                    value: /^[A-Za-z0-9]{8,20}$/,
                    message: "8자리 이상의 문자와 숫자를 사용해주세요.",
                  },
                  minLength: {
                    value: 8,
                    message: "8자리 이상의 비밀번호를 입력해주세요.",
                  },
                })}
                defaultValue={data.password}
                type="password"
                autoComplete="off"
              />
              <span>{errors?.password?.message}</span>
            </InputBox>
            <InputBox>
              <p>비밀번호 확인</p>
              <input
                {...register("pwCheck", {
                  required: "항목을 입력해주세요",
                  pattern: {
                    value: /^[A-Za-z0-9]{8,20}$/,
                    message: "8자리 이상의 문자와 숫자를 사용해주세요.",
                  },
                  minLength: {
                    value: 8,
                    message: "8자리 이상의 비밀번호를 입력해주세요.",
                  },
                })}
                defaultValue={data.password_confirmation}
                type="password"
                autoComplete="off"
              />
              <span>{errors?.pwCheck?.message}</span>
            </InputBox>
            <span>{errors?.extraError?.message}</span>
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
    padding: 100px 0 100px 0;
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
    background-color: #191919; /* Green */
    color: white;
    width: 80px;
    border-radius: 5px;
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

export default UpdatePw;

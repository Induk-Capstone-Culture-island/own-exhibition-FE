import { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post("http://13.125.82.62/api/login/", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/main");
      })
      .catch((error) => {
        alert("아이디 또는 비밀번호를 확인해주세요.");
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/main");
    }
  }, []);
  return (
    <Container>
      <LoginBox>
        <Title>로그인</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email")}
            type="email"
            name="email"
            placeholder="이메일 입력"
          />
          <Input
            {...register("password", {
              required: "항목을 입력해주세요",
            })}
            autoComplete="on"
            type="password"
            placeholder="비밀번호 입력"
            minLength="8"
          />
          <LoginBtn>로그인</LoginBtn>
        </Form>
        <Link to="/Register">
          <SignupBtn>회원가입</SignupBtn>
        </Link>
        <Link to="/FindPw">
          <FindPw>비밀번호 찾기</FindPw>
        </Link>
      </LoginBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vw;
  background-color: white;
`;

const LoginBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  width: auto;
  background-color: white;
  padding: 50px;
  box-shadow: 0 10px 30px rgb(25 25 25 / 50%);
`;

const Title = styled.h1`
  text-align: center;
  color: #609ff1;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 32px;
  font-weight: bold;
  /* padding: 10px; */
  margin-bottom: 15px;
`;

const Form = styled.form``;

const Input = styled.input`
  font-size: 14px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(25, 25, 25, 0.05);
  border: 2px solid transparent;
  border-radius: 5px;
`;

const LoginBtn = styled.button`
  font-size: 14px;
  color: #fff;
  padding: 10px;
  background-color: #609ff1;
  border: none;
  border-radius: 5px;
  width: 100%;
`;

const SignupBtn = styled.button`
  margin-top: 15px;
  border: none;
  padding: 10px;
  color: gray;
  transition-duration: 0.4s;
  &:hover {
    background-color: gray;
    color: white;
  }
`;

const FindPw = styled.span`
  float: right;
  font-size: 13px;
  color: #58a6ff;
  padding: 10px;
`;
export default Login;

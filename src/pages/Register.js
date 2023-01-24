import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.password !== data.pwCheck) {
      setError(
        "pwCheck",
        {
          message: "패스워드가 일치하지 않습니다.",
        },
        { shouldFocus: true }
      );
    }

    axios
      .post("http://13.125.82.62/api/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.pwCheck,
        birthday: data.birthday,
        phone: data.phoneNum,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        alert("중복된 이메일입니다.");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/main");
    }
  }, []);

  return (
    <Container>
      <RegisterBox>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("name", { required: "항목을 입력해주세요" })}
            type="text"
            name="name"
            placeholder="이름 입력"
          />
          <span>{errors?.name?.message}</span>
          <Input
            {...register("email", { required: "항목을 입력해주세요" })}
            type="email"
            name="email"
            placeholder="이메일 입력"
          />
          <span>{errors?.email?.message}</span>
          <Input
            {...register("password", {
              required: "항목을 입력해주세요",
            })}
            autoComplete="on"
            type="password"
            placeholder="비밀번호 입력"
            minLength="8"
          />
          <Input
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
            autoComplete="on"
            type="password"
            placeholder="비밀번호 확인"
          />
          <span>{errors?.pwCheck?.message}</span>
          <Input
            {...register("birthday", {
              required: "항목을 입력해주세요",
              pattern: {
                value:
                  /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
                message: "올바른 날짜가 아닙니다.",
              },
            })}
            type="text"
            placeholder="생년월일 입력 ex)1989-01-01"
          />
          <span>{errors?.birthday?.message}</span>
          <Input
            {...register("phoneNum", {
              required: "항목을 입력해주세요",
            })}
            type="text"
            placeholder="전화번호 입력 ex)01012341234"
          />
          <span>{errors?.phoneNum?.message}</span>
          <Btn>가입하기</Btn>
        </Form>
      </RegisterBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vw;
  background-color: white;
`;

const RegisterBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  max-width: 550px;
  background-color: white;
  padding: 50px;
  box-shadow: 0 10px 30px rgb(25 25 25 / 50%);
`;

const Title = styled.h1`
  text-align: center;
  color: #609ff1;
  text-transform: uppercase;
  font-weight: bolder;
  letter-spacing: 1px;
  font-size: 24px;
  padding: 10px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  span {
    font-size: 12px;
    padding-bottom: 30px;
  }
`;

const Input = styled.input`
  font-size: 14px;
  padding: 10px;
  margin-bottom: 10px;
  /* border-radius: 5px; */
  /* border: none;
   */
  background-color: rgba(25, 25, 25, 0.05);
  border: 2px solid transparent;
  width: 100%;
  box-sizing: border-box;
`;

const Btn = styled.button`
  font-size: 14px;
  color: #fff;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #609ff1;
  border: none;
  width: 100%;
`;

export default Register;

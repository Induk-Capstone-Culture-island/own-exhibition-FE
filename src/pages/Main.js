import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import background from "../assets/img/background.jpg";
import arrow from "../assets/img/arrow.svg";
import axios from "axios";
import { Helmet } from "react-helmet";

function Main() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    const json = await axios("http://13.125.82.62/api/exhibition");
    setData(json.data.data);
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
        <title>너만의 전시회</title>
      </Helmet>
      <VisualBox>
        <img src={background} className="background" alt="background" />
        <h3 className="visualText">
          전시회 고민하지 말고,
          <br />
          너만의 전시회
        </h3>
        <img src={arrow} className="arrow" alt="scroll down" />
      </VisualBox>
      <Wrapper>
        <div className="searchTab">
          <Title>현재 전시</Title>
          <Search
            type="text"
            placeholder="작품명 또는 작가명을 검색해주세요."
          />
          <SearchBtn type="button">검색</SearchBtn>
        </div>
        <div className="borderSolid"></div>
        <ExhibitionList>
          {data?.slice(0, 8).map((data) => (
            <Exhibition key={data.seq} title={data.title}>
              <Link to={`/exhibition/${data.seq}`}>
                <Img src={data.thumbnail} />
                <p className="area">{data.area}</p>
                <p className="title">{data.title}</p>
                <p className="date">
                  {data.startDate}~{data.endDate}
                </p>
              </Link>
            </Exhibition>
          ))}
        </ExhibitionList>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div``;

const VisualBox = styled.section`
  height: 770px;
  /* height: 772px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;

  .background {
    position: absolute;
    width: 100vw;
    height: 770px;
    top: 0;
    z-index: -10;
    background-position: center;
  }

  h3 {
    padding-top: 227px;
    font-weight: 600;
    font-size: 52px;
    line-height: 70px;
    text-align: center;
    color: white;
  }

  .arrow {
    margin-bottom: 41px;
    animation: down 1.5s infinite;
    opacity: 60%;
  }
  @keyframes down {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translateY(15px);
    }
    40% {
      transform: translate(0);
    }
  }

  @-webkit-keyframes down {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translateY(15px);
    }
    40% {
      transform: translate(0);
    }
  }
`;

const Wrapper = styled.div`
  background-color: white;
  color: #000;

  .searchTab {
    padding: 10px;
  }

  .borderSolid {
    display: block;
    margin: auto;
    padding-top: 15px;
    width: 95%;
    background-color: #fff;
    border-bottom: 1px solid #000;
  }
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 600;
  padding: 50px 0 0 30px;
`;

const Search = styled.input`
  width: 30%;
  height: 48px;
  border: none;
  border-radius: 24px;
  color: #949494;
  letter-spacing: -0.7px;
  background: #eee;
  margin: 20px 0 0 27px;
  padding: 0 13px;
`;

const SearchBtn = styled.button`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  min-width: 100px;
  max-width: 100%;
  height: 48px;
  padding: 0 30px;
  font-weight: 600;
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 24px;
  text-align: center;
  line-height: 46px;
  margin-left: 15px;
  cursor: pointer;
`;

const ExhibitionList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(300px, 1fr));
  grid-gap: 20px;
  padding: 50px;
`;

const Exhibition = styled.li`
  background-color: white;
  margin-bottom: 100px;
  padding: 30px;
  border-radius: 5px;
  color: inherit;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  p {
    margin-top: 15px;
    color: #000;
  }

  .area {
    font-weight: 550;
  }

  .title {
    font-weight: bold;
    font-size: 18px;
  }

  .date {
    color: #777777;
    font-weight: 500;
    font-size: 15px;
  }
`;

const Img = styled.img`
  display: block;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  height: 270px;
  border-bottom: 1px solid #000;
  :hover {
    transition: all 0.4s;
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default Main;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import background from "../assets/img/background.jpg";
import arrow from "../assets/img/arrow.svg";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link } from "react-scroll";
import Exhibition from "../components/Exhibition";
import Paging from "../hooks/Paging";

function Main() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const getData = async () => {
    const json = await axios(`http://13.125.82.62/api/exhibition?page=${page}`);
    setData(json.data.data);
    setLoading(false);
  };

  const getCount = async () => {
    const json = await axios(`http://13.125.82.62/api/exhibition`);
    setCount(json.data);
  };

  useEffect(() => {
    getData();
    getCount();
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
  }, [page]);

  return loading ? (
    <Container>
      <Helmet>
        <title>너만의 전시회</title>
      </Helmet>
      <VisualBox>
        <img src={background} className="background" alt="background" />
        <h3 className="visualText">
          전시회 고민하지 말고,
          <br />
          '너만의 전시회'
        </h3>
        <img src={arrow} className="arrow" alt="scroll down" />
      </VisualBox>
      <LoadingPage>
        <span>Loading ...</span>
      </LoadingPage>
    </Container>
  ) : (
    <Container>
      <Helmet>
        <title>너만의 전시회</title>
      </Helmet>
      <VisualBox>
        <img src={background} className="background" alt="background" />
        <h3 className="visualText">
          전시회, 어디 갈지 고민이라면
          <br />
          '너만의 전시회'를 찾아봐!
        </h3>
        <div className="button-wrapper">
          <Link
            to="scroll-bottom"
            spy={true}
            smooth={true}
            delay={100}
            isDynamic={true}
          >
            <div className="part1-button">전시 보러가기</div>
          </Link>
        </div>
        <img src={arrow} className="arrow" alt="scroll down" />
      </VisualBox>
      <Wrapper>
        <div className="searchTab">
          <Title id="scroll-bottom">현재 전시</Title>
        </div>
        <Exhibition data={data} />
        <Paging
          page={page}
          count={count}
          data={data}
          handlePageChange={handlePageChange}
        />
      </Wrapper>
    </Container>
  );
}

const LoadingPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 100;
  color: ${(props) => props.theme.textColor};
`;

const Container = styled.div``;

const VisualBox = styled.section`
  height: 772px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
  @media screen and (min-width: 1920px) {
    height: 970px;
  }

  .background {
    position: absolute;
    width: 100vw;
    height: 772px;
    top: 0;
    z-index: -10;
    background-position: center;
    @media screen and (min-width: 1920px) {
      height: 970px;
    }
  }

  .button-wrapper {
    position: absolute;
    left: 50%;
    bottom: 25%;
    transform: translate(-50%, 25%);
    white-space: nowrap;
  }
  .part1-button {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    padding: 10px 100px;
    border: 1px solid #fff;
    color: #fff;
    background-color: rgb(0, 0, 0, 0.1);
    cursor: pointer;
    &:hover {
      background-color: rgb(255, 255, 255, 0.2);
      transition: all 0.5s ease;
    }
  }

  h3 {
    padding-top: 227px;
    font-weight: 600;
    font-size: 52px;
    line-height: 70px;
    text-align: center;
    color: #fff;
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
  background-color: #fff;
  color: #000;

  .searchTab {
    padding: 10px;
  }

  .borderSolid {
    display: block;
    margin: auto;
    padding-top: 15px;
    width: 95%;
    border-bottom: 1px solid rgb(0, 0, 0, 0.2);
  }
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 600;
  padding: 50px 0 0 30px;
`;

export default Main;

import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import CatBtn from "../hooks/CatBtn";

function Exhibition({ data }) {
  const [activeCat, setActiveCat] = useState("전체");
  const [datas, setDatas] = useState(data);
  const [input, setInput] = useState("");

  const search = datas.filter((item) =>
    item.title.toLowerCase().includes(input.toLowerCase())
  );

  useEffect(() => {
    activeCat === "전체"
      ? setDatas(data)
      : setDatas(data.filter((item) => item.realmName === activeCat));
  }, [activeCat, data]);

  return (
    <Wrapper>
      <Search
        type="text"
        placeholder="작품명을 검색해주세요."
        onChange={(event) => {
          setInput(event.target.value.toLowerCase());
        }}
      />
      <SearchBtn type="submit">검색</SearchBtn>
      <div className="borderSolid"></div>
      <ButtonWrapper>
        <CatBtn
          name="전체"
          catActive={activeCat === "전체" ? true : false}
          handleSetCat={setActiveCat}
        />
        <CatBtn
          name="미술"
          catActive={activeCat === "미술" ? true : false}
          handleSetCat={setActiveCat}
        />
        <CatBtn
          name="연극"
          catActive={activeCat === "연극" ? true : false}
          handleSetCat={setActiveCat}
        />
        <CatBtn
          name="기타"
          catActive={activeCat === "기타" ? true : false}
          handleSetCat={setActiveCat}
        />
      </ButtonWrapper>
      <CardList>
        {search.map((data, i) => (
          <Card key={i} {...data} />
        ))}
      </CardList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .borderSolid {
    display: block;
    margin: auto;
    padding-top: 15px;
    width: 95%;
    border-bottom: 1px solid rgb(0, 0, 0, 0.2);
  }
`;

const CardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(300px, 1fr));
  grid-gap: 20px;
  padding: 50px 50px 0 59px;
`;

const ButtonWrapper = styled.div`
  margin: 10px 0 0 15px;
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
  padding: 0 20px;
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
export default Exhibition;

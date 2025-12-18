import '../styles/wlclist.css';
import kor_data from '../assets/data/WLC_KOR.json';
import { Link, useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { getRecentView } from '../utils/recentView';

export default function Wlc() {
  const [searchParams, setSearchParams] = useSearchParams(); // 검색어 쿼리

  const [input, setInput] = useState(''); // 검색 input value 상태

  const recentView = useMemo(() => getRecentView(), []); // localstorage에서 최근 본 문답 가져오기

  const keyword = searchParams.get('q')?.trim().toLowerCase() ?? ''; // 현재 URL에서 가져온 검색어(q)

  const hasSearched = keyword !== ''; // 검색어 쿼리가 있는지 없는지 여부

  // 배열을 하나로 합치고 소문자로 변경후 대괄호 + 숫자 형태의 각주번호를 가진 내용은 제거하는 함수
  const normalizeText = (arr) =>
    arr
      .join('')
      .replace(/\[\d+\]/g, '')
      .toLowerCase();

  // 데이터 배열로 변경
  const wlcArray = useMemo(() => {
    return Object.entries(kor_data).map(([num, value]) => ({
      wlcNum: num,
      Q: value.Q,
      A: value.A,
      qText: normalizeText(value.Q),
      aText: normalizeText(value.A),
    }));
  }, []);

  // 렌더링에 필요한 자료 리스트
  const filteredList = useMemo(() => {
    if (!keyword) return wlcArray; // 쿼리 없으면 wlc_bible_kor 데이터 전체

    // 검색어가 숫자인지 여부
    const isNumberKeyword = /^\d+$/.test(keyword);

    return wlcArray.filter((item) => {
      if (isNumberKeyword) {
        return String(item.wlcNum) === keyword;
      }

      return item.qText.includes(keyword) || item.aText.includes(keyword);
    });
  }, [keyword, wlcArray]);

  // 문답 리스트 렌더링
  const questionListRender = filteredList.map((item) => (
    <li key={item.wlcNum}>
      <Link to={`/wlcview/${item.wlcNum}`}>
        <strong>{item.wlcNum}</strong>
        <p>{item.Q.join('')}</p>
      </Link>
    </li>
  ));

  // 최근 본 문답 렌더링
  const recentViewRender = recentView.map((num, idx) => {
    return (
      <li key={idx}>
        <Link to={`/wlcview/${num}`}>
          <span>제 {num}문</span>
          <strong>{kor_data[num].Q}</strong>
          <p>{kor_data[num].A}</p>
        </Link>
      </li>
    );
  });

  // input 입력시 input 상태 변하는 함수
  const onChageInput = (e) => {
    setInput(e.currentTarget.value);
  };

  // 검색 버튼 클릭 이벤트 함수
  // 검색어를 URL(query string)에 반영
  const onClickSearch = () => {
    const keyword = input.trim().toLowerCase();

    if (!keyword) {
      setSearchParams({});
      return;
    }

    setSearchParams({ q: keyword });
  };

  // noResult에서 전체 문답 보기 버튼 클릭 이벤트
  const onResetSearch = () => {
    setInput('');
  };

  const noResult = (
    <li className="no-result">
      <p>
        <strong>"{keyword}"</strong> 와(과) 일치하는 내용이 없습니다.
      </p>
      <button type="button" onClick={onResetSearch}>
        전체 문답 보기
      </button>
    </li>
  );

  return (
    <div className="wlc-list">
      <div className="inner">
        <div className="title">
          <h2>웨스트민스터 대요리 문답</h2>
          <p>
            1문부터 196문까지의 전체 목록을 탐색하고 원하는 문답을 찾아보세요.
          </p>
        </div>
        <div className="recent-view">
          <div className="title">
            <img src="/assets/images/recent-ico.png" alt="최근 목록 아이콘" />
            <h3>최근 본 문답</h3>
          </div>
          <ul className="recent-card-list">{recentViewRender}</ul>
        </div>
        <div className="all-list">
          <h3>전체 문답 보기</h3>
          <div className="search-area">
            <input
              type="search"
              placeholder="키워드 및 번호로 문답 검색"
              aria-label="검색어를 통한 대요리 문답 검색"
              value={input}
              onChange={onChageInput}
            />
            <button type="button" onClick={onClickSearch}>
              검색
            </button>
          </div>
          <ul className="question-list">
            {questionListRender}
            {hasSearched && filteredList.length === 0 && noResult}
          </ul>
        </div>
      </div>
    </div>
  );
}

import '../styles/wlclist.css';
import kor_data from '../assets/data/WLC_KOR.json';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { addRecentView, getRecentView } from '../utils/recentView';

export default function Wlc() {
  const [wlcList, setWlcList] = useState(kor_data); // 전체 문답 보기 상태

  const [input, setInput] = useState(''); // 검색 input value 상태

  const [hasSearched, setHasSearched] = useState(false); // 검색 여부 상태

  const [recentView, setRecentView] = useState(() => getRecentView()); // 최근 본 문답 상태

  const [searchedKeyword, setSearchedKeyword] = useState(''); // 검색버튼을 누른 검색어 상태

  // 문답 리스트 클릭 이벤트
  const onClickQuestion = (e) => {
    const thisNum = Number(e.currentTarget.dataset.num);

    const next = addRecentView(thisNum);
    setRecentView(next);
  };

  // 문답 리스트 렌더링
  const questionListRender = Object.entries(wlcList).map(([key, value]) => {
    return (
      <li key={key} onClick={onClickQuestion} data-num={key}>
        <Link to={`/wlcview/${key}`}>
          <strong>{key}</strong>
          <p>{value.Q.join('')}</p>
        </Link>
      </li>
    );
  });

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

  // 배열을 하나로 합치고 소문자로 변경후 대괄호 + 숫자 형태의 각주번호를 가진 내용은 제거하는 함수
  const normalizeText = (arr) =>
    arr
      .join('')
      .replace(/\[\d+\]/g, '')
      .toLowerCase();

  // 문자열을 검색하는 함수
  const includesText = (arr, keyword) => {
    const text = normalizeText(arr);
    return text.includes(keyword);
  };

  // input 입력시 input 상태 변하는 함수
  const onChageInput = (e) => {
    setInput(e.currentTarget.value);
  };

  // 검색 버튼 클릭 이벤트 함수
  const onClickSearch = () => {
    const keyword = input.trim().toLowerCase();

    if (!keyword) {
      setHasSearched(false);
      setWlcList(kor_data);
      return;
    }

    setHasSearched(true);
    setSearchedKeyword(input);

    const isNumberKeyword = /^\d+$/.test(keyword);

    const searchData = Object.entries(kor_data).reduce((acc, [key, value]) => {
      // 숫자만 입력시 문답 번호만 매칭
      if (isNumberKeyword) {
        if (key === keyword) {
          acc[key] = value;
        }
        return acc;
      }

      // 문자 포함시 Q, A 내용 검색
      const qMatch = includesText(value.Q ?? [], keyword);
      const aMatch = includesText(value.A ?? [], keyword);

      if (qMatch || aMatch) {
        acc[key] = value;
      }

      return acc;
    }, {});

    setWlcList(searchData);
  };

  // noResult에서 전체 문답 보기 버튼 클릭 이벤트
  const onResetSearch = () => {
    setInput('');
    setHasSearched(false);
    setWlcList(kor_data);
  };

  const noResult = (
    <li className="no-result">
      <p>
        <strong>"{searchedKeyword}"</strong> 와(과) 일치하는 내용이 없습니다.
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
            {hasSearched && Object.keys(wlcList).length === 0 && noResult}
          </ul>
        </div>
      </div>
    </div>
  );
}

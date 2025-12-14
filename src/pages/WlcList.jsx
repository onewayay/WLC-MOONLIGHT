import '../styles/wlclist.css';
import kor_data from '../assets/data/WLC_KOR.json';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { addRecentView, getRecentView } from '../utils/recentView';

export default function Wlc() {
  // 최근 본 문답 상태
  const [recentView, setRecentView] = useState(() => getRecentView());

  // 문답 리스트 클릭 이벤트
  const onClickQuestion = (e) => {
    const thisNum = Number(e.currentTarget.dataset.num);

    const next = addRecentView(thisNum);
    setRecentView(next);
  };

  // 문답 리스트 렌더링
  const questionListRender = Object.entries(kor_data).map(([key, value]) => {
    return (
      <li key={key} onClick={onClickQuestion} data-num={key}>
        <Link to={`/wlcview/${key}`}>
          <strong>{key}</strong>
          <p>{value.Q}</p>
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
            />
            <button type="button">검색</button>
          </div>
          <ul className="question-list">{questionListRender}</ul>
        </div>
      </div>
    </div>
  );
}

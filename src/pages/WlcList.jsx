import '../styles/wlclist.css';
import kor_data from '../assets/data/WLC_KOR.json';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function Wlc() {
  const [qaNum, setQaNum] = useState(1); // 문답 상태
  console.log('qaNum', qaNum);

  const recentView = useRef([]); // 최근 본 문답 목록 배열을 담을 Ref

  // 문답 3개까지만 담기도록
  const setrecentView = (num) => {
    // 기존에 존재하면 삭제
    const existIndex = recentView.current.indexOf(num);

    if (existIndex !== -1) {
      recentView.current.splice(existIndex, 1);
    }

    // 뒤로 추가
    recentView.current.push(num);

    // 3개 초과되면 앞에서 제거
    if (recentView.current.length > 3) {
      recentView.current.shift();
    }
  };

  // 문답 리스트 클릭 이벤트
  const onClickQuestion = (e) => {
    const thisNum = e.currentTarget.dataset.num;
    setQaNum(thisNum);
    setrecentView(thisNum);
    localStorage.setItem('recentView', JSON.stringify(recentView.current));
  };

  // 새로고침 및 이동시에 recentView에 현재 localStorage 값을 넣어줌
  useEffect(() => {
    recentView.current = JSON.parse(localStorage.getItem('recentView') ?? '[]');
  }, []);

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
  const recentViewRender = JSON.parse(
    localStorage.getItem('recentView') ?? '[]'
  ).map((num, idx) => {
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
        <div className="search-area">
          <input
            type="search"
            placeholder="키워드 및 번호로 문답 검색"
            aria-label="검색어를 통한 대요리 문답 검색"
          />
          <button type="button">검색</button>
        </div>
        <ul className="question-list">{questionListRender}</ul>
        <div className="recent-view">
          <div className="title">
            <img src="/assets/images/recent-ico.png" alt="최근 목록 아이콘" />
            <h3>최근 본 문답</h3>
          </div>
          <ul className="recent-card-list">{recentViewRender}</ul>
        </div>
      </div>
    </div>
  );
}

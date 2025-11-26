// import wlc_bible_eng from '../assets/data/wlc_bible_eng.json';
import { useState } from 'react';
import wlc_bible_kor from '../assets/data/wlc_bible_kor.json';
import '../styles/annotation-collect.css';
import { useNavigate } from 'react-router-dom';

export default function AnnotationCollect() {
  const navigate = useNavigate();

  const [searchVerse, setSearchVerse] = useState(''); // 검색어 상태

  const allVerseList = []; // 전체 말씀 목록

  Object.keys(wlc_bible_kor).forEach((key) => {
    allVerseList.push({
      num: key,
      verse: wlc_bible_kor[key],
    });
  });

  // 관련 문답 바로가기 버튼 이벤트
  const goWlc = (e) => {
    navigate(`/wlc?num=${e.currentTarget.dataset.num}`);
  };

  // 렌더링할 말씀 목록 상태
  const [verseList, setVerseList] = useState(allVerseList);

  // 실제 렌더링 될 말씀 리스트
  const renderVerseList = verseList.map((item) => {
    return (
      <li key={item.num}>
        <strong>[{item.num}]</strong>
        <div>
          {item.verse.map((verse, idx) => (
            <p key={idx}>{verse}</p>
          ))}
        </div>
        <button type="button" data-num={item.num} onClick={goWlc}>
          관련 문답 바로가기
        </button>
      </li>
    );
  });

  // 검색어 상태 변경 이벤트
  const onChangeSearch = (e) => {
    setSearchVerse(e.currentTarget.value);
  };

  // 검색 버튼 이벤트
  const onClickSearch = () => {
    const searchedList = allVerseList.filter((item) =>
      item.verse.some((v) => v.includes(searchVerse))
    );
    setVerseList(searchedList);
  };

  console.log('전체', allVerseList);

  return (
    <div className="annotation_list">
      <h2>주석 말씀 모음</h2>
      <div role="search" className="search_area">
        <label htmlFor="verseSearch">말씀 구절 검색</label>
        <input
          type="search"
          id="verseSearch"
          name="verse_search"
          aria-label="검색어를 통해 말씀 구절 검색"
          value={searchVerse}
          onChange={onChangeSearch}
        />
        <button type="button" onClick={onClickSearch}>
          검색
        </button>
      </div>
      <ul className="verse_list">{renderVerseList}</ul>
    </div>
  );
}

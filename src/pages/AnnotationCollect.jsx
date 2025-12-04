import { useState } from 'react';
import kor_data from '../assets/data/WLC_KOR.json';
import wlc_bible_kor from '../assets/data/wlc_bible_kor.json';
import '../styles/annotation-collect.css';
import { Link, useNavigate } from 'react-router-dom';

export default function AnnotationCollect() {
  // const navigate = useNavigate();

  // const [searchVerse, setSearchVerse] = useState(''); // 검색어 상태

  // const allVerseList = []; // 전체 말씀 목록

  // Object.keys(wlc_bible_kor).forEach((key) => {
  //   allVerseList.push({
  //     num: key,
  //     verse: wlc_bible_kor[key],
  //   });
  // });

  // // 관련 문답 바로가기 버튼 이벤트
  // const goWlc = (e) => {
  //   let wlcNum = null;

  //   for (let key in kor_data) {
  //     if (kor_data[key].ref?.includes(Number(e.currentTarget.dataset.num))) {
  //       wlcNum = key;
  //       break;
  //     }
  //   }

  //   navigate(`/wlc?num=${wlcNum}`);
  // };

  // // 렌더링할 말씀 목록 상태
  // const [verseList, setVerseList] = useState(allVerseList);

  // // 실제 렌더링 될 말씀 리스트
  // const renderVerseList = verseList.map((item) => {
  //   return (
  //     <li key={item.num}>
  //       <strong>[{item.num}]</strong>
  //       <div>
  //         {item.verse.map((verse, idx) => (
  //           <p key={idx}>{verse}</p>
  //         ))}
  //       </div>
  //       <button type="button" data-num={item.num} onClick={goWlc}>
  //         관련 문답 바로가기
  //       </button>
  //     </li>
  //   );
  // });

  // // 검색어 상태 변경 이벤트
  // const onChangeSearch = (e) => {
  //   setSearchVerse(e.currentTarget.value);
  // };

  // // 검색 버튼 이벤트
  // const onClickSearch = () => {
  //   const searchedList = allVerseList.filter((item) =>
  //     item.verse.some((v) => v.includes(searchVerse))
  //   );
  //   setVerseList(searchedList);
  // };

  // console.log('전체', allVerseList);

  return (
    <div className="annotation-collect">
      <div className="inner">
        <div className="title">
          <h2>각주 모음</h2>
          <p>웨스트민스터 대요리 문답에 인용된 모든 성경 구절을 확인하세요.</p>
        </div>
        <div className="search-area">
          <input
            type="search"
            placeholder="키워드 및 번호로 문답 검색"
            aria-label="검색어를 통한 각주 말씀 검색"
          />
          <button type="button">검색</button>
        </div>
        <ul className="verse-list">
          <li>
            <Link to="">
              <div>
                <div className="kor-verse">
                  <strong>요한복음 3:16</strong>
                  <p>
                    하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를
                    믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라
                  </p>
                </div>
                <div className="eng-verse">
                  <strong>John 3:16</strong>
                  <p>
                    For God so loved the world, that he gave his only begotten
                    Son, that whosoever believeth in him should not perish, but
                    have everlating life{' '}
                  </p>
                </div>
              </div>
              <span>32 문</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <div>
                <div className="kor-verse">
                  <strong>요한복음 3:16</strong>
                  <p>
                    하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를
                    믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라
                  </p>
                </div>
                <div className="eng-verse">
                  <strong>John 3:16</strong>
                  <p>
                    For God so loved the world, that he gave his only begotten
                    Son, that whosoever believeth in him should not perish, but
                    have everlating life{' '}
                  </p>
                </div>
              </div>
              <span>32 문</span>
            </Link>
          </li>
          <li>
            <Link to="">
              <div>
                <div className="kor-verse">
                  <strong>요한복음 3:16</strong>
                  <p>
                    하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를
                    믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라
                  </p>
                </div>
                <div className="eng-verse">
                  <strong>John 3:16</strong>
                  <p>
                    For God so loved the world, that he gave his only begotten
                    Son, that whosoever believeth in him should not perish, but
                    have everlating life{' '}
                  </p>
                </div>
              </div>
              <span>32 문</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

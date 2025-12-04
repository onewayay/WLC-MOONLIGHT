import '../styles/wlclist.css';
import eng_data from '../assets/data/WLC_ENG.json';
import kor_data from '../assets/data/WLC_KOR.json';
import wlc_bible_eng from '../assets/data/wlc_bible_eng.json';
import wlc_bible_kor from '../assets/data/wlc_bible_kor.json';
import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Link, useSearchParams } from 'react-router-dom';

export default function Wlc() {
  // const [searchParams] = useSearchParams();
  // const initialNum = Number(searchParams.get('num')) || 1;
  // const [qaNum, setQaNum] = useState(initialNum); // 현재 문답 번호 상태
  // const [isKor, setIsKor] = useState(true); // 모바일에서 한글/영문 상태

  // // 모바일에서 한글 버튼 이벤트
  // const switchKor = () => {
  //   setIsKor(true);
  // };

  // // 모바일에서 영어 버튼 이벤트
  // const switchEng = () => {
  //   setIsKor(false);
  // };

  // // 한글 성경 말씀
  // const renderingBibleKor = kor_data[qaNum].ref?.map((item, idx) => {
  //   return (
  //     <div className="content" key={idx}>
  //       <p>[{item}]</p>
  //       <pre>{wlc_bible_kor[item]}</pre>
  //     </div>
  //   );
  // });

  // // 영문 성경 말씀
  // const renderingBibleEng = eng_data[qaNum].ref?.map((item, idx) => {
  //   return (
  //     <div className="content" key={idx}>
  //       <p>[{item}]</p>
  //       <pre>{wlc_bible_eng[item]}</pre>
  //     </div>
  //   );
  // });

  // // 다음 문답
  // const nextNum = () => {
  //   if (qaNum === 196) {
  //     return;
  //   } else {
  //     setQaNum(qaNum + 1);
  //   }
  // };

  // // 이전 문답
  // const prevNum = () => {
  //   if (qaNum === 1) {
  //     return;
  //   } else {
  //     setQaNum(qaNum - 1);
  //   }
  // };

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
        <ul className="question-list">
          <li>
            <Link to="">
              <strong>1</strong>
              <p>사람의 첫째 되는 목적은 무엇인가?</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <strong>1</strong>
              <p>사람의 첫째 되는 목적은 무엇인가?</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <strong>1</strong>
              <p>사람의 첫째 되는 목적은 무엇인가?</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <strong>1</strong>
              <p>사람의 첫째 되는 목적은 무엇인가?</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <strong>1</strong>
              <p>사람의 첫째 되는 목적은 무엇인가?</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <strong>1</strong>
              <p>사람의 첫째 되는 목적은 무엇인가?</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <strong>1</strong>
              <p>사람의 첫째 되는 목적은 무엇인가?</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <strong>1</strong>
              <p>사람의 첫째 되는 목적은 무엇인가?</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <strong>1</strong>
              <p>사람의 첫째 되는 목적은 무엇인가?</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <strong>1</strong>
              <p>사람의 첫째 되는 목적은 무엇인가?</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <strong>1</strong>
              <p>사람의 첫째 되는 목적은 무엇인가?</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <strong>1</strong>
              <p>사람의 첫째 되는 목적은 무엇인가?</p>
            </Link>
          </li>
        </ul>
        <div className="recent-view">
          <div className="title">
            <img src="/assets/images/recent-ico.png" alt="최근 목록 아이콘" />
            <h3>최근 본 문답</h3>
          </div>
          <ul className="recent-card-list">
            <li>
              <Link to="">
                <span>제 101 문</span>
                <strong>
                  문문문문문문문문문문문문문문문문문문문문문문문문문문문문문문문문문문
                </strong>
                <p>
                  답답답답답답답답답답답답답답답문문문문문문문문문문문문문문문문문문문문문답답답답답답답답답
                </p>
              </Link>
            </li>
            <li>
              <Link to="">
                <span>제 101 문</span>
                <strong>
                  문문문문문문문문문문문문문문문문문문문문문문문문문문문문문문문문문문
                </strong>
                <p>
                  답답답답답답답답답답답답답답답문문문문문문문문문문문문문문문문문문문문문답답답답답답답답답
                </p>
              </Link>
            </li>
            <li>
              <Link to="">
                <span>제 101 문</span>
                <strong>
                  문문문문문문문문문문문문문문문문문문문문문문문문문문문문문문문문문문
                </strong>
                <p>
                  답답답답답답답답답답답답답답답문문문문문문문문문문문문문문문문문문문문문답답답답답답답답답
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

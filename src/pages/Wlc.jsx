import '../styles/section.css';
import eng_data from '../assets/data/WLC_ENG.json';
import kor_data from '../assets/data/WLC_KOR.json';
import wlc_bible_eng from '../assets/data/wlc_bible_eng.json';
import wlc_bible_kor from '../assets/data/wlc_bible_kor.json';
import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function Wlc() {
  const [qaNum, setQaNum] = useState(1); // 현재 문답 번호 상태
  const [isKor, setIsKor] = useState(true); // 모바일에서 한글/영문 상태

  // 모바일에서 한글 버튼 이벤트
  const switchKor = () => {
    setIsKor(true);
  };

  // 모바일에서 영어 버튼 이벤트
  const switchEng = () => {
    setIsKor(false);
  };

  // 한글 성경 말씀
  const renderingBibleKor = kor_data[qaNum].ref?.map((item, idx) => {
    return (
      <div className="content" key={idx}>
        <p>[{item}]</p>
        <pre>{wlc_bible_kor[item]}</pre>
      </div>
    );
  });

  // 영문 성경 말씀
  const renderingBibleEng = eng_data[qaNum].ref?.map((item, idx) => {
    return (
      <div className="content" key={idx}>
        <p>[{item}]</p>
        <pre>{wlc_bible_eng[item]}</pre>
      </div>
    );
  });

  // 다음 문답
  const nextNum = () => {
    if (qaNum === 196) {
      return;
    } else {
      setQaNum(qaNum + 1);
    }
  };

  // 이전 문답
  const prevNum = () => {
    if (qaNum === 1) {
      return;
    } else {
      setQaNum(qaNum - 1);
    }
  };

  return (
    <>
      <Header qaNum={qaNum} setQaNum={setQaNum} />
      <section id="section">
        <div className="text_area">
          <div className={`eng ${isKor ? '' : 'active'}`}>
            <div className="title">
              <button onClick={switchEng}>
                <span>English</span>
              </button>
            </div>
            <div className="content">
              <p>Q.{qaNum}</p>
              <pre>{eng_data[qaNum].Q}</pre>
              <p>A.{qaNum}</p>
              <pre>{eng_data[qaNum].A}</pre>
            </div>
          </div>
          <div className={`kor ${isKor ? 'active' : ''}`}>
            <div className="title">
              <button onClick={switchKor}>
                <span>한글</span>
              </button>
            </div>
            <div className="content">
              <p>Q.{qaNum}</p>
              <pre>{kor_data[qaNum].Q}</pre>
              <p>A.{qaNum}</p>
              <pre>{kor_data[qaNum].A}</pre>
            </div>
          </div>
        </div>
        <div className="annotation_area">
          <div className={`eng_annotation ${isKor ? '' : 'active'}`}>
            {renderingBibleEng}
          </div>
          <div className={`kor_annotation ${isKor ? 'active' : ''}`}>
            {renderingBibleKor}
          </div>
        </div>
        <div className="pagination">
          <button className="prev" onClick={prevNum}></button>
          <div className="count">
            <span className="current">{qaNum}</span> /{' '}
            <span className="total">196</span>
          </div>
          <button className="next" onClick={nextNum}></button>
        </div>
      </section>
      <Footer />
    </>
  );
}

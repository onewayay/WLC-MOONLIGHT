import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/wlcview.css';
import kor_data from '../assets/data/WLC_KOR.json';
import eng_data from '../assets/data/WLC_ENG.json';
import wlc_bible_kor from '../assets/data/wlc_bible_kor_v2.json';
import wlc_bible_eng from '../assets/data/wlc_bible_eng_v2.json';
import { useContext, useEffect } from 'react';
import { addRecentView } from '../utils/recentView';
import { LangContext } from '../context/LangContext';
import { useTitle } from '../hooks/useTitle';
import { useMetaDescription } from '../hooks/useMetaDescription';
import { useCanonical } from '../hooks/useCanonical';

export default function WlcView() {
  const { qaNum } = useParams(); // 현재 페이지의 문답 숫자

  const navigate = useNavigate();

  const { lang } = useContext(LangContext); // 언어 상태 컨텍스트

  // 현재 문답에 알맞는 한글 각주
  const presentKorBible = wlc_bible_kor.filter((item) => {
    return (kor_data[qaNum].ref ?? []).includes(Number(item.num));
  });
  // 현재 문답에 알맞는 영어 각주
  const presentEngBible = wlc_bible_eng.filter((item) => {
    return (eng_data[qaNum].ref ?? []).includes(Number(item.num));
  });

  const onClickPrev = () => {
    if (Number(qaNum) === 1) return;
    navigate(`/wlc/${Number(qaNum) - 1}`);
  };
  const onClickNext = () => {
    if (Number(qaNum) === 196) return;
    navigate(`/wlc/${Number(qaNum) + 1}`);
  };

  // 각주 렌더링
  const footnoteRender = presentKorBible.map((item, idx) => {
    return (
      <li key={idx}>
        <div className={`kor-verse ${lang === 'kor' ? 'active' : ''}`}>
          <strong>
            [{item.num}] {item.bible}
          </strong>
          <p>{item.verse}</p>
        </div>
        <div className={`eng-verse ${lang === 'kor' ? '' : 'active'}`}>
          <strong>
            [{presentEngBible[idx]?.num}] {presentEngBible[idx]?.bible}
          </strong>
          <p>{presentEngBible[idx]?.verse}</p>
        </div>
      </li>
    );
  });

  useEffect(() => {
    if (!qaNum) return;
    addRecentView(qaNum);
  }, [qaNum]);

  // title 및 meta description 설정
  const questionTitle = kor_data[qaNum].Q ?? '';
  useTitle(`대요리 문답 제 ${qaNum}문 - ${questionTitle} | WLC MOONLIGHT`);
  useMetaDescription(
    `웨스트민스터 대요리문답 제 ${qaNum}문 "${questionTitle}"에 대한 질문과 답변, 그리고 관련 성경 구절을 제공합니다.`,
  );
  useCanonical(`https://wlcmoonlight.vercel.app/wlc/${qaNum}`);

  return (
    <div className="wlc-view">
      <div className="inner">
        <div className="title">
          <div className="num-lang">
            <h2>제 {qaNum}문</h2>
          </div>
          <div className="move-btns">
            <button type="button" onClick={onClickPrev}>
              이전 문답
            </button>
            <button type="button" onClick={onClickNext}>
              다음 문답
            </button>
            <Link to="/wlc">리스트로 돌아가기</Link>
          </div>
        </div>
        <div className="qna">
          <div className={`kor-qna ${lang === 'kor' ? 'active' : ''}`}>
            <div className="question">
              <strong>질문</strong>
              <p>{kor_data[qaNum].Q}</p>
            </div>
            <div className="answer">
              <strong>답변</strong>
              <pre>{kor_data[qaNum].A}</pre>
            </div>
          </div>
          <div className={`eng-qna ${lang === 'kor' ? '' : 'active'}`}>
            <div className="question">
              <strong>Question</strong>
              <p>{eng_data[qaNum].Q}</p>
            </div>
            <div className="answer">
              <strong>Answer</strong>
              <pre>{eng_data[qaNum].A}</pre>
            </div>
          </div>
        </div>
        <div className="footnote">
          <h3>관련 성경 구절</h3>
          <ul className="verse-list">{footnoteRender}</ul>
        </div>
      </div>
    </div>
  );
}

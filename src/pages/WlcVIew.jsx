import { Link } from 'react-router-dom';
import '../styles/wlcview.css';

export default function WlcView() {
  return (
    <div className="wlc-view">
      <div className="inner">
        <div className="title">
          <h2>제 1문</h2>
          <div className="move-btns">
            <button type="button">다음 문답</button>
            <button type="button">이전 문답</button>
            <Link to="/wlclist">리스트로 돌아가기</Link>
          </div>
        </div>
        <div className="qna">
          <div className="kor-qna">
            <div className="question">
              <strong>질문</strong>
              <p>인간 최고의 주된 목적은 무엇인가?</p>
            </div>
            <div className="answer">
              <strong>답변</strong>
              <p>
                인간 최고의 주된 목적은 [1] 하나님을 영화롭게 하는 것과 그분을
                충만히 즐거워하는 것입즐거워하는 것입니다. [2] 영원토록
              </p>
            </div>
          </div>
          <div className="eng-qna">
            <div className="question">
              <strong>Question</strong>
              <p>What is the chief and highest end of man?</p>
            </div>
            <div className="answer">
              <strong>Answer</strong>
              <p>
                Man's chief and highest end is to glorify God, [1] and fully to
                enjoy him forever. [2]
              </p>
            </div>
          </div>
        </div>
        <div className="footnote">
          <h3>관련 성경 구절</h3>
          <ul className="verse-list">
            <li>
              <div className="kor-verse">
                <strong>[1] 로마서 11:36</strong>
                <p>
                  이는 만물이 주에게서 나오고 주로 말미암고 주에게로 돌아감이라
                  그에게 영광이 세세에 있을지어다 아멘 고린도전서 10:31 그런즉
                  너희가 먹든지 마시든지 무엇을 하든지 다 하나님의 영광을 위하여
                  하라
                </p>
              </div>
              <div className="eng-verse">
                <strong>[1] Romans 11:36</strong>
                <p>
                  For of him, and through him, and to him, are all things: to
                  whom be glory for ever. Amen. 1 Corinthians 10:31. Whether
                  therefore ye eat, or drink, or whatsoever ye do, do all to the
                  glory of God.
                </p>
              </div>
            </li>
            <li>
              <div className="kor-verse">
                <strong>[1] 로마서 11:36</strong>
                <p>
                  이는 만물이 주에게서 나오고 주로 말미암고 주에게로 돌아감이라
                  그에게 영광이 세세에 있을지어다 아멘 고린도전서 10:31 그런즉
                  너희가 먹든지 마시든지 무엇을 하든지 다 하나님의 영광을 위하여
                  하라
                </p>
              </div>
              <div className="eng-verse">
                <strong>[1] Romans 11:36</strong>
                <p>
                  For of him, and through him, and to him, are all things: to
                  whom be glory for ever. Amen. 1 Corinthians 10:31. Whether
                  therefore ye eat, or drink, or whatsoever ye do, do all to the
                  glory of God.
                </p>
              </div>
            </li>
            <li>
              <div className="kor-verse">
                <strong>[1] 로마서 11:36</strong>
                <p>
                  이는 만물이 주에게서 나오고 주로 말미암고 주에게로 돌아감이라
                  그에게 영광이 세세에 있을지어다 아멘 고린도전서 10:31 그런즉
                  너희가 먹든지 마시든지 무엇을 하든지 다 하나님의 영광을 위하여
                  하라
                </p>
              </div>
              <div className="eng-verse">
                <strong>[1] Romans 11:36</strong>
                <p>
                  For of him, and through him, and to him, are all things: to
                  whom be glory for ever. Amen. 1 Corinthians 10:31. Whether
                  therefore ye eat, or drink, or whatsoever ye do, do all to the
                  glory of God.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

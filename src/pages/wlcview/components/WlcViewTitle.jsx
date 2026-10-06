import { Link } from 'react-router-dom';

export default function WlcViewTitle({ onClickPrev, onClickNext, qaNum }) {
  return (
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
  );
}

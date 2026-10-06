import { Link } from 'react-router-dom';

export default function MainBanner() {
  return (
    <div className="main-banner">
      <div className="banner-text">
        <h2>
          웨스트민스터 대요리 문답을 통해
          <br />
          신앙의 깊이를 더하세요.
        </h2>
        <p>웨스트민스터 대요리 문답(1문 ~ 196문)의 한글과 영문 텍스트 그리고 각 문답에 해당하는 성경 구절을 탐색해 보세요.</p>
      </div>
      <div className="banner-btns">
        <Link to="/wlc">대요리 문답 보기</Link>
        <Link to="/annotationcollect">각주 모음 보기</Link>
      </div>
    </div>
  );
}

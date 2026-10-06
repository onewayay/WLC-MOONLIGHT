import { Link } from 'react-router-dom';

export default function MainContentsList() {
  return (
    <section>
      <h3>주요 콘텐츠</h3>
      <ul className="card-links">
        <li>
          <Link to="/wlc">
            <div className="title">
              <div className="ico-box">
                <img src="/assets/images/book-ico.png" alt="책 아이콘" />
              </div>
              <h4>대요리 문답 보기</h4>
            </div>
            <p>
              제 1문 '인간 최고의 주된 목적'부터 제 196문 '주기도문의 결론'까지 각 문답과 각주 말씀들을 볼 수 있습니다. 한글과 영문 텍스트를 함께
              제공합니다.
            </p>
          </Link>
        </li>
        <li>
          <Link to="/annotationcollect">
            <div className="title">
              <div className="ico-box">
                <img src="/assets/images/note-ico.png" alt="노트 아이콘" />
              </div>
              <h4>각주 모음 보기</h4>
            </div>
            <p>
              각 문답 각주에 달린 성경 말씀들만 모아 볼 수 있습니다. 성경 및 문답 번호 순으로 정렬해서 볼 수 있습니다. 한글과 영문 텍스트를 함께
              제공합니다.
            </p>
          </Link>
        </li>
      </ul>
    </section>
  );
}

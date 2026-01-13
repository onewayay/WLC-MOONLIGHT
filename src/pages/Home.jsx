import { Link } from 'react-router-dom';
import '../styles/home.css';
import { useTitle } from '../hooks/useTitle';
import { useMetaDescription } from '../hooks/useMetaDescription';
import { useCanonical } from '../hooks/useCanonical';

export default function Home() {
  // title 및 meta description 설정
  useTitle(`웨스트민스터 대요리문답 | WLC MOONLIGHT`);
  useMetaDescription(
    '웨스트민스터 대요리문답 1문부터 196문까지의 한글·영문 문답과 각 문답에 인용된 성경 구절을 함께 제공하는 신앙 학습 사이트입니다.'
  );
  useCanonical('https://wlcmoonlight.vercel.app/');

  return (
    <div className="home">
      <div className="inner">
        <div className="main-banner">
          <div className="banner-text">
            <h2>
              웨스트민스터 대요리 문답을 통해
              <br />
              신앙의 깊이를 더하세요.
            </h2>
            <p>
              웨스트민스터 대요리 문답(1문 ~ 196문)의 한글과 영문 텍스트 그리고
              각 문답에 해당하는 성경 구절을 탐색해 보세요.
            </p>
          </div>
          <div className="banner-btns">
            <Link to="/wlc">대요리 문답 보기</Link>
            <Link to="/annotationcollect">각주 모음 보기</Link>
          </div>
        </div>
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
                  제 1문 '인간 최고의 주된 목적'부터 제 196문 '주기도문의
                  결론'까지 각 문답과 각주 말씀들을 볼 수 있습니다. 한글과 영문
                  텍스트를 함께 제공합니다.
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
                  각 문답 각주에 달린 성경 말씀들만 모아 볼 수 있습니다. 성경 및
                  문답 번호 순으로 정렬해서 볼 수 있습니다. 한글과 영문 텍스트를
                  함께 제공합니다.
                </p>
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

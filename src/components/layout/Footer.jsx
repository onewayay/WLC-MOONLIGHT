import '../../styles/footer.css';

export default function Footer() {
  // 탑 버튼 이벤트
  const onClickTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer id="footer">
      <div className="inner">
        <div className="links">
          <a
            href="https://lightofmoon.super.site/"
            target="_black"
            title="달빛교회 홈페이지 새창열림으로 이동"
          >
            달빛교회 홈페이지
          </a>
          <a
            href="https://www.youtube.com/channel/UC1qNeyY604e5u4ODeHW1G1Q"
            target="_black"
            title="달빛교회 유튜브 페이지 새창열림으로 이동"
          >
            달빛교회 유튜브
          </a>
          <a
            href="https://www.instagram.com/moonlight_church/"
            target="_black"
            title="달빛교회 인스타그램 새창열림으로 이동"
          >
            달빛교회 인스타그램
          </a>
          <a
            href="https://x.com/lightofmoon_ch"
            target="_black"
            title="달빛교회 X 새창열림으로 이동"
          >
            달빛교회 엑스
          </a>
        </div>
        <div className="copyright">
          <p>
            저작권 안내 : 웨스트민스터 대요리문답 196개 문답의 본문 구조 및 구문
            분석은 "흑곰북스" 출판사 고유의 것으로서, 신학적인 변질과 오용을
            막기 위해 복제나 수정을 금지합니다.
          </p>
          <p>Copyright © 2025 달빛교회 All rights reserved.</p>
        </div>
        <button
          type="button"
          className="top-btn"
          aria-label="페이지 최상단으로 이동하기"
          onClick={onClickTop}
        ></button>
      </div>
    </footer>
  );
}

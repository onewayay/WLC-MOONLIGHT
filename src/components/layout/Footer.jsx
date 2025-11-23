export default function Footer() {
  return (
    <footer id="footer">
      <div className="ft_logo"></div>
      <div className="copyright">
        <p>
          저작권 안내 : 웨스트민스터 대요리문답 196개 문답의 본문 구조 및 구문
          분석은 "흑곰북스" 출판사 고유의 것으로서, 신학적인 변질과 오용을 막기
          위해 복제나 수정을 금지합니다.
        </p>
      </div>
      <div className="link">
        <a href="https://lightofmoon.super.site/" target="_blank">
          <i className="fa-regular fa-house"></i>
        </a>
        <a href="https://www.instagram.com/moonlight_church" target="_blank">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a
          href="https://www.youtube.com/channel/UC1qNeyY604e5u4ODeHW1G1Q"
          target="_blank"
        >
          <i className="fa-brands fa-youtube"></i>
        </a>
      </div>
    </footer>
  );
}

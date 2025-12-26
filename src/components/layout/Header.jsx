import { useContext, useEffect, useState } from 'react';
import '../../styles/header.css';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { LangContext } from '../../context/LangContext';

export default function Header() {
  const location = useLocation();

  const { lang, setLang } = useContext(LangContext); // 언어 상태 컨텍스트

  const { theme, setTheme } = useContext(ThemeContext); // 테마 상태 컨텍스트

  const [isMoMenuOpen, setIsMoMenuOpen] = useState(false); // 모바일 메뉴 열림 상태

  // 언어 상태 교체 함수
  const changeLang = () => {
    lang === 'kor' ? setLang('eng') : setLang('kor');
  };

  const showLangBtn =
    (location.pathname.startsWith('/wlc/') && location.pathname !== '/wlc') ||
    location.pathname === '/annotationcollect';

  // theme 상태 변경 이벤트
  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // 모바일 메뉴 여는 동작
  const openMoMenu = () => {
    setIsMoMenuOpen(true);
  };

  // 모바일 메뉴 닫는 동작
  const closeMoMenu = () => {
    setIsMoMenuOpen(false);
  };

  // 모바일 메뉴 열릴때 body, html 락 걸리도록
  useEffect(() => {
    if (isMoMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMoMenuOpen]);

  return (
    <>
      <header id="header">
        <div className={`dim ${isMoMenuOpen ? 'active' : ''}`}></div>
        <div className="inner">
          <div className="logo">
            <h1 id="logo">
              <Link to="/" className="nav-link"></Link>
            </h1>
          </div>
          <nav className="nav">
            <NavLink to="/" className="nav-link">
              홈
            </NavLink>
            <NavLink to="/wlc" className="nav-link">
              문답 보기
            </NavLink>
            <NavLink to="/annotationcollect" className="nav-link">
              주석 모음
            </NavLink>
            {showLangBtn && (
              <button
                type="button"
                className="lang-btn"
                onClick={changeLang}
                aria-label="언어 변경"
              >
                <span className={lang === 'kor' ? 'active' : ''}>한글</span> /
                <span className={lang === 'kor' ? '' : 'active'}>ENG</span>
              </button>
            )}
            <button
              type="button"
              className={`theme-btn ${theme}`}
              onClick={changeTheme}
              aria-label="색상 테마 변경"
            ></button>
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={openMoMenu}
              aria-label="모바일 메뉴 열기"
              aria-controls="mobile-menu"
              aria-expanded={isMoMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </nav>
        </div>
        <div
          id="mobile-menu"
          className={`mobile-menu ${isMoMenuOpen ? 'open' : ''}`}
          aria-hidden={!isMoMenuOpen}
          role="navigation"
        >
          <Link to="/" className="nav-link" onClick={closeMoMenu}>
            홈으로
            <div></div>
          </Link>
          <Link to="/wlc" className="nav-link" onClick={closeMoMenu}>
            문답 보기
            <div></div>
          </Link>
          <Link
            to="/annotationcollect"
            className="nav-link"
            onClick={closeMoMenu}
          >
            각주 모음
            <div></div>
          </Link>
          <button
            type="button"
            onClick={closeMoMenu}
            aria-label="모바일 메뉴 닫기"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </>
  );
}

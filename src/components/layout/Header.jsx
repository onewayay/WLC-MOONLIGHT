import { useContext, useEffect, useState } from 'react';
import '../../styles/header.css';
import { Link, NavLink } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext); // 테마 상태 컨텍스트

  const [isMoMenuOpen, setIsMoMenuOpen] = useState(false); // 모바일 메뉴 열림 상태

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
            <button
              type="button"
              className={`theme-btn ${theme}`}
              onClick={changeTheme}
            ></button>
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={openMoMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </nav>
        </div>
        <div className={`mobile-menu ${isMoMenuOpen ? 'open' : ''}`}>
          <button type="button" onClick={closeMoMenu}>
            <span></span>
            <span></span>
          </button>
          <div className="mobile-nav">
            <Link to="/" className="nav-link">
              홈으로
            </Link>
            <Link to="/wlc" className="nav-link">
              문답 보기
            </Link>
            <Link to="/annotationcollect" className="nav-link">
              각주 모음
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

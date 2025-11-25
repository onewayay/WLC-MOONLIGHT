import { useState } from 'react';
import '../../styles/header.css';
import Menu from './Menu';

export default function Header({ qaNum, setQaNum }) {
  const [isTabOpen, setIsTabOpen] = useState(false); // 탭메뉴 열림/닫힘 상태

  // 탭메뉴 열림/닫힘 토글
  const toggleTabMenu = () => {
    setIsTabOpen(!isTabOpen);
    document.body.classList.toggle('fixed');
  };

  // 탭메뉴 닫기
  const closeTabMenu = () => {
    setIsTabOpen(false);
    document.body.classList.remove('fixed');
  };

  return (
    <>
      <header id="header">
        <div className="logo">
          <h1 id="logo">
            <a href="/">로고</a>
          </h1>
        </div>
        <button
          type="button"
          onClick={toggleTabMenu}
          className={`tab ${isTabOpen ? 'active' : ''}`}
        >
          <i>탭메뉴</i>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
      <Menu
        qaNum={qaNum}
        setQaNum={setQaNum}
        isTabOpen={isTabOpen}
        closeTabMenu={closeTabMenu}
      />
    </>
  );
}

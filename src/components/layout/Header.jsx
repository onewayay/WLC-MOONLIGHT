import { useState } from 'react';
import '../../styles/header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  const [theme, setTheme] = useState('dark');

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <header id="header">
        <div className="inner">
          <div className="logo">
            <h1 id="logo">
              <a href="/">로고</a>
            </h1>
          </div>
          <nav className="nav">
            <Link to="">문답 보기</Link>
            <Link to="">주석 모음</Link>
            <button
              type="button"
              className={`theme-btn ${theme}`}
              onClick={changeTheme}
            ></button>
          </nav>
        </div>
      </header>
    </>
  );
}

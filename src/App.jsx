import { useEffect, useState } from 'react';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import './styles/index.css';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import { LangContext } from './context/LangContext';
import { useTitle } from './hooks/useTitle';

function App() {
  // localStorage 에서 불러온 userTheme 값
  const userTheme = localStorage.getItem('userTheme');
  console.log(userTheme);

  // theme 상태
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('userTheme') ?? 'dark';
  });

  // lang 상태
  const [lang, setLang] = useState('kor');

  useEffect(() => {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
  }, [theme]);

  // 디바이스 크기에 따라 lang 상태 변경. 모바일에서는 lang 상태가 kor, 나머지는 both로 기본 지정
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)'); // MediaQueryList 객체
    const handler = () => {
      const mobile = mq.matches; // mq.match가 true면 767 이하
      setLang(mobile ? 'kor' : 'both');
    };

    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useTitle('WLC MOONLIGHT');

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <LangContext.Provider value={{ lang, setLang }}>
          <ScrollRestoration />
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </LangContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;

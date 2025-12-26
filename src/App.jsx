import { useEffect, useState } from 'react';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import './styles/index.css';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import { LangContext } from './context/LangContext';
import { useTitle } from './hooks/useTitle';

function App() {
  const [theme, setTheme] = useState('dark'); // theme 상태
  const [lang, setLang] = useState('kor'); // theme 상태

  useEffect(() => {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
  }, [theme]);

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

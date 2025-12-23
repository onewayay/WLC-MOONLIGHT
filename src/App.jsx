import { useEffect, useState } from 'react';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import './styles/index.css';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const [theme, setTheme] = useState('dark'); // theme 상태

  useEffect(() => {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ScrollRestoration />
        <Header />
        <main>
          <Outlet />
          {/* <button type="button" className="top-btn">
          Top{' '}
          </button> */}
        </main>
        <Footer />
      </ThemeContext.Provider>
    </>
  );
}

export default App;

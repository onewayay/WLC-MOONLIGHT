import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import './styles/index.css';
import { Outlet, ScrollRestoration } from 'react-router-dom';

function App() {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <main>
        <Outlet />
        <button type="button" className="top-btn">
          Top{' '}
        </button>
      </main>
      <Footer />
    </>
  );
}

export default App;

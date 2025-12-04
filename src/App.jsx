import Header from './components/layout/Header';
import './styles/index.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default App;

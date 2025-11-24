import { useState } from 'react';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Menu from './components/layout/Menu';
import Wlc from './Wlc';

function App() {
  const [qaNum, setQaNum] = useState(1);

  return (
    <>
      <Header qaNum={qaNum} setQaNum={setQaNum} />
      <Wlc />
      <Footer />
    </>
  );
}

export default App;

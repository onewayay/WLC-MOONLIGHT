import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <Link to="/wlc">WLC 바로가기</Link>
      <Link to="/annotationcollect">주석 모음 바로가기</Link>
    </div>
  );
}

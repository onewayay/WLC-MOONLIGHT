import { getRecentView } from '@/utils/recentView';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function RecentView({ kor_data }) {
  const recentView = useMemo(() => getRecentView(), []); // localstorage에서 최근 본 문답 가져오기

  // 최근 본 문답 렌더링
  const recentViewRender = recentView.map((num) => {
    return (
      <li key={num}>
        <Link to={`/wlc/${num}`}>
          <span>제 {num}문</span>
          <strong>{kor_data[num].Q}</strong>
          <p>{kor_data[num].A}</p>
        </Link>
      </li>
    );
  });
  return (
    <div className="recent-view">
      <div className="title">
        <img src="/assets/images/recent-ico.png" alt="최근 목록 아이콘" />
        <h3>최근 본 문답</h3>
      </div>
      <ul className="recent-card-list">{recentViewRender}</ul>
    </div>
  );
}

import '@/styles/wlclist.css';
import kor_data from '@/assets/data/WLC_KOR.json';
import { useSearchParams } from 'react-router-dom';
import { useTitle } from '@/hooks/useTitle';
import { useMetaDescription } from '@/hooks/useMetaDescription';
import { useCanonical } from '@/hooks/useCanonical';
import RecentView from '@/pages/wlclist/components/RecentView';
import WlcAllList from '@/pages/wlclist/components/WlcAllList';

export default function WlcList() {
  const [searchParams, setSearchParams] = useSearchParams(); // 검색어 쿼리
  const keyword = searchParams.get('q')?.trim().toLowerCase() ?? ''; // 현재 URL에서 가져온 검색어(q)

  const hasSearched = keyword !== ''; // 검색어 쿼리가 있는지 없는지 여부

  // title 및 meta description 설정
  useTitle(hasSearched ? `"${keyword}" 검색 결과 - 문답 보기 | WLC MOONLIGHT` : '문답 보기 | WLC MOONLIGHT');
  useMetaDescription(
    hasSearched
      ? `"${keyword}"에 대한 웨스트민스터 대요리문답 검색 결과입니다. 관련 문답을 확인해 보세요.`
      : '웨스트민스터 대요리문답 1문부터 196문까지의 전체 리스트을 제공하며, 각 문답과 관련 성경 구절을 자세히 확인할 수 있습니다.',
  );
  useCanonical('https://wlcmoonlight.vercel.app/wlc');

  return (
    <div className="wlc-list">
      <div className="inner">
        <div className="title">
          <h2>웨스트민스터 대요리 문답</h2>
          <p>1문부터 196문까지의 전체 목록을 탐색하고 원하는 문답을 찾아보세요.</p>
        </div>
        <RecentView kor_data={kor_data} />
        <WlcAllList keyword={keyword} kor_data={kor_data} hasSearched={hasSearched} setSearchParams={setSearchParams} />
      </div>
    </div>
  );
}

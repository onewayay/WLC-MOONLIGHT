import '@/styles/home.css';
import { useTitle } from '@/hooks/useTitle';
import { useMetaDescription } from '@/hooks/useMetaDescription';
import { useCanonical } from '@/hooks/useCanonical';
import MainBanner from '@/pages/home/components/MainBanner';
import MainContentsList from '@/pages/home/components/MainContentsList';

export default function Home() {
  // title 및 meta description 설정
  useTitle(`웨스트민스터 대요리문답 | WLC MOONLIGHT`);
  useMetaDescription(
    '웨스트민스터 대요리문답 1문부터 196문까지의 한글·영문 문답과 각 문답에 인용된 성경 구절을 함께 제공하는 신앙 학습 사이트입니다.',
  );
  useCanonical('https://wlcmoonlight.vercel.app/');

  return (
    <div className="home">
      <div className="inner">
        <MainBanner />
        <MainContentsList />
      </div>
    </div>
  );
}

import wlc_bible_kor from '../assets/data/wlc_bible_kor_v2.json';
import wlc_bible_eng from '../assets/data/wlc_bible_eng_v2.json';
import '../styles/annotation-collect.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function AnnotationCollect() {
  // 현재 보여질 문답 갯수 상태
  const [visibleCount, setVisibleCount] = useState(20);

  // 화면 맨 아래에서 스크롤이 아래로 내려왔는지 감지하는 역할
  const observerRef = useRef(null);

  useEffect(() => {
    // obseverRef 생성 이전일 경우 바로 return
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => {
            if (prev >= wlc_bible_kor.length) return prev;
            return prev + 20;
          });
        }
      },
      // thredshold: 얼마나 보여야 콜백을 실행할지. 0~1의 값. 1은 100% 화면에 들어왔을 때 실행
      // rootMargin: 지정된 값만큼 이전에 미리 감지해서 콜백 실행
      { threshold: 0, rootMargin: '200px' }
    );

    observer.observe(observerRef.current); // observerRef를 감지 대상으로 설정

    return () => observer.disconnect(); // 클린업
  }, []);

  // 데이터를 갯수 상태 만큼 자름
  const visibleItems = wlc_bible_kor.slice(0, visibleCount);

  const verseRender = visibleItems.map((item, idx) => {
    return (
      <li key={item.id}>
        <Link to={`/wlcview/${item.wlcNum}`}>
          <div>
            <div className="kor-verse">
              <strong>{item.bible}</strong>
              <p>{item.verse}</p>
            </div>
            <div className="eng-verse">
              <strong>{wlc_bible_eng[idx].bible}</strong>
              <p>{wlc_bible_eng[idx].verse}</p>
            </div>
          </div>
          <span>{item.wlcNum} 문</span>
        </Link>
      </li>
    );
  });

  return (
    <div className="annotation-collect">
      <div className="inner">
        <div className="title">
          <h2>각주 모음</h2>
          <p>웨스트민스터 대요리 문답에 인용된 모든 성경 구절을 확인하세요.</p>
        </div>
        <div className="search-area">
          <input
            type="search"
            placeholder="키워드 및 번호로 문답 검색"
            aria-label="검색어를 통한 각주 말씀 검색"
          />
          <button type="button">검색</button>
        </div>
        <ul className="verse-list">{verseRender}</ul>
      </div>
      <div ref={observerRef} style={{ height: 1 }} />
    </div>
  );
}

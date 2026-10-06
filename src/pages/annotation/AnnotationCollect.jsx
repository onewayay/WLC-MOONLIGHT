import wlc_bible_kor from '@/assets/data/wlc_bible_kor_v2.json';
import wlc_bible_eng from '@/assets/data/wlc_bible_eng_v2.json';
import '@/styles/annotation-collect.css';
import { Link, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { LangContext } from '@/context/LangContext';
import { useTitle } from '@/hooks/useTitle';
import { useMetaDescription } from '@/hooks/useMetaDescription';
import { useCanonical } from '@/hooks/useCanonical';
import AnnotationSearch from '@/pages/annotation/components/AnnotationSearch';

export default function AnnotationCollect() {
  const [searchParams, setSearchParams] = useSearchParams(); // 검색어 쿼리

  const { lang } = useContext(LangContext); // 언어 상태 컨텍스트

  const [visibleCount, setVisibleCount] = useState(20); // 현재 보여질 문답 갯수 상태

  // 현재 URL에서 가져온 검색어(q)
  const keyword = searchParams.get('q')?.trim().toLowerCase() ?? '';

  // 검색어 쿼리가 있는지 없는지 여부
  const hasSearched = keyword !== '';

  // 렌더링에 필요한 자료 리스트
  const filteredList = useMemo(() => {
    if (!keyword) return wlc_bible_kor;

    const isNumberKeyword = /^\d+$/.test(keyword);

    return wlc_bible_kor.filter((korItem) => {
      const engItem = wlc_bible_eng[korItem.id - 1];

      if (isNumberKeyword) {
        return String(korItem.wlcNum) === keyword;
      }

      switch (lang) {
        case 'kor':
          return korItem.bible.toLowerCase().includes(keyword) || korItem.verse.toLowerCase().includes(keyword);

        case 'eng':
          return engItem.bible.toLowerCase().includes(keyword) || engItem.verse.toLowerCase().includes(keyword);

        case 'both':
        default:
          return (
            korItem.bible.toLowerCase().includes(keyword) ||
            korItem.verse.toLowerCase().includes(keyword) ||
            engItem.bible.toLowerCase().includes(keyword) ||
            engItem.verse.toLowerCase().includes(keyword)
          );
      }
    });
  }, [keyword, lang]);

  // 화면 맨 아래에서 스크롤이 아래로 내려왔는지 감지하는 역할
  const observerRef = useRef(null);

  // 무한스크롤
  // observer가 화면 하단에 도달하면 visibleCount를 증가
  useEffect(() => {
    // obseverRef 생성 이전일 경우 바로 return
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => {
            if (prev >= filteredList.length) return prev;
            return prev + 20;
          });
        }
      },
      // thredshold: 얼마나 보여야 콜백을 실행할지. 0~1의 값. 1은 100% 화면에 들어왔을 때 실행
      // rootMargin: 지정된 값만큼 이전에 미리 감지해서 콜백 실행
      { threshold: 0, rootMargin: '200px' },
    );

    observer.observe(observerRef.current); // observerRef를 감지 대상으로 설정

    return () => observer.disconnect(); // 클린업
  }, [filteredList.length]);

  // 데이터를 갯수 상태 만큼 자름
  const visibleItems = filteredList.slice(0, visibleCount);

  // 리스트 렌더링
  const verseRender = visibleItems.map((item) => {
    return (
      <li key={item.id}>
        <div>
          <div className={`kor-verse ${lang === 'kor' ? 'active' : ''}`}>
            <strong>{item.bible}</strong>
            <p>{item.verse}</p>
          </div>
          <div className={`eng-verse ${lang === 'kor' ? '' : 'active'}`}>
            <strong>{wlc_bible_eng[item.id - 1].bible}</strong>
            <p>{wlc_bible_eng[item.id - 1].verse}</p>
          </div>
        </div>
        <Link to={`/wlc/${item.wlcNum}`}>
          {item.wlcNum} 문
          <span className="chevron-icon" aria-hidden />
        </Link>
      </li>
    );
  });

  // noResult에서 전체 문답 보기 버튼 클릭 이벤트. 전체 상태 초기화 해줌
  const onResetSearch = () => {
    setVisibleCount(20);
    setSearchParams({});
  };

  const noResult = (
    <li className="no-result">
      <p>
        <strong>"{keyword}"</strong> 와(과) 일치하는 내용이 없습니다.
      </p>
      <button type="button" onClick={onResetSearch}>
        전체 문답 보기
      </button>
    </li>
  );

  // title 및 meta description 설정
  useTitle(hasSearched ? `"${keyword}" 검색 결과 - 각주 모음 | WLC MOONLIGHT` : '각주 모음 | WLC MOONLIGHT');
  useMetaDescription(
    hasSearched
      ? `"${keyword}"와(과) 관련된 성경 구절 검색 결과입니다. 웨스트민스터 대요리문답에 인용된 말씀을 확인해 보세요.`
      : '웨스트민스터 대요리문답에 인용된 모든 성경 구절을 한곳에 모아 제공하며, 각 문답과 연결된 말씀을 쉽게 확인할 수 있습니다.',
  );
  useCanonical('https://wlcmoonlight.vercel.app/annotation');

  return (
    <div className="annotation-collect">
      <div className="inner">
        <div className="title">
          <h2>각주 모음</h2>
          <p>웨스트민스터 대요리 문답에 인용된 모든 성경 구절을 확인하세요.</p>
        </div>
        <AnnotationSearch keyword={keyword} setVisibleCount={setVisibleCount} setSearchParams={setSearchParams} />
        <div className="verse-section">
          <div className="info">
            <span>문답 번호를 누르면 해당 문답 상세 페이지로 이동합니다.</span>
          </div>
          <ul className="verse-list">
            {verseRender}
            {hasSearched && filteredList.length === 0 && noResult}
          </ul>
        </div>
      </div>
      <div ref={observerRef} style={{ height: 1 }} />
    </div>
  );
}

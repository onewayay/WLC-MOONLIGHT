import wlc_bible_kor from '../assets/data/wlc_bible_kor_v2.json';
import wlc_bible_eng from '../assets/data/wlc_bible_eng_v2.json';
import '../styles/annotation-collect.css';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function AnnotationCollect() {
  const [searchParams, setSearchParams] = useSearchParams(); // 검색어 쿼리

  const [visibleCount, setVisibleCount] = useState(20); // 현재 보여질 문답 갯수 상태

  const [input, setInput] = useState(''); // 검색 input value 상태

  // 현재 URL에서 가져온 검색어(q)
  const keyword = searchParams.get('q')?.trim().toLowerCase() ?? '';

  // 검색어 쿼리가 있는지 없는지 여부
  const hasSearched = keyword !== '';

  // 렌더링에 필요한 자료 리스트
  const filteredList = useMemo(() => {
    if (!keyword) return wlc_bible_kor; // 쿼리 없으면 wlc_bible_kor 데이터 전체

    // 검색어가 숫자인지 여부
    const isNumberKeyword = /^\d+$/.test(keyword);

    return wlc_bible_kor.filter((item) => {
      if (isNumberKeyword) {
        return String(item.wlcNum) === keyword;
      }

      return (
        item.bible.toLowerCase().includes(keyword) ||
        item.verse.toLowerCase().includes(keyword)
      );
    });
  }, [keyword]);

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
      { threshold: 0, rootMargin: '200px' }
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
        <Link to={`/wlcview/${item.wlcNum}`}>
          <div>
            <div className="kor-verse">
              <strong>{item.bible}</strong>
              <p>{item.verse}</p>
            </div>
            <div className="eng-verse">
              <strong>{wlc_bible_eng[item.id - 1].bible}</strong>
              <p>{wlc_bible_eng[item.id - 1].verse}</p>
            </div>
          </div>
          <span>{item.wlcNum} 문</span>
        </Link>
      </li>
    );
  });

  // input 입력시 input 상태 변하는 함수
  const onChageInput = (e) => {
    setInput(e.currentTarget.value);
  };

  // 검색 버튼 클릭 이벤트 함수
  // 검색어를 URL(query string)에 반영, 무한스크롤 노출 개수를 초기화
  const onClickSearch = () => {
    const keyword = input.trim().toLowerCase();

    setVisibleCount(20);

    if (!keyword) {
      setSearchParams({});
      return;
    }

    setSearchParams({ q: keyword });
  };

  // 마운트 이후에 keyword값을 input value로 설정해주기(뒤로 왔을때도 검색했던 내용 input에 남아 있도록)
  useEffect(() => {
    setInput(keyword);
  }, [keyword]);

  // noResult에서 전체 문답 보기 버튼 클릭 이벤트. 전체 상태 초기화 해줌
  const onResetSearch = () => {
    setInput('');
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
            value={input}
            onChange={onChageInput}
          />
          <button type="button" onClick={onClickSearch}>
            검색
          </button>
        </div>
        <ul className="verse-list">
          {verseRender}
          {hasSearched && filteredList.length === 0 && noResult}
        </ul>
      </div>
      <div ref={observerRef} style={{ height: 1 }} />
    </div>
  );
}

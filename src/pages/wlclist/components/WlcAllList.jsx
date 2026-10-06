import WlcSearch from '@/pages/wlclist/components/WlcSearch';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function WlcAllList({ keyword, kor_data, hasSearched, setSearchParams }) {
  // 배열을 하나로 합치고 소문자로 변경후 대괄호 + 숫자 형태의 각주번호를 가진 내용은 제거하는 함수
  const normalizeText = (arr) =>
    arr
      .join('')
      .replace(/\[\d+\]/g, '')
      .toLowerCase();

  // 데이터 배열로 변경
  const wlcArray = useMemo(() => {
    return Object.entries(kor_data).map(([num, value]) => ({
      wlcNum: num,
      Q: value.Q,
      A: value.A,
      qText: normalizeText(value.Q),
      aText: normalizeText(value.A),
    }));
  }, [kor_data]);

  // 렌더링에 필요한 자료 리스트
  const filteredList = useMemo(() => {
    if (!keyword) return wlcArray; // 쿼리 없으면 wlc_bible_kor 데이터 전체

    // 검색어가 숫자인지 여부
    const isNumberKeyword = /^\d+$/.test(keyword);

    return wlcArray.filter((item) => {
      if (isNumberKeyword) {
        return String(item.wlcNum) === keyword;
      }

      return item.qText.includes(keyword) || item.aText.includes(keyword);
    });
  }, [keyword, wlcArray]);

  // 문답 리스트 렌더링
  const questionListRender = filteredList.map((item) => (
    <li key={item.wlcNum}>
      <Link to={`/wlc/${item.wlcNum}`}>
        <strong>{item.wlcNum}</strong>
        <p>{item.Q.join('')}</p>
      </Link>
    </li>
  ));
  // noResult에서 전체 문답 보기 버튼 클릭 이벤트
  const onResetSearch = () => {
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
    <div className="all-list">
      <h3>전체 문답 보기</h3>
      <WlcSearch keyword={keyword} setSearchParams={setSearchParams} />
      <ul className="question-list">
        {questionListRender}
        {hasSearched && filteredList.length === 0 && noResult}
      </ul>
    </div>
  );
}

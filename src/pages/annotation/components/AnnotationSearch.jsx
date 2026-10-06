import { useEffect, useState } from 'react';

export default function AnnotationSearch({ keyword, setSearchParams, setVisibleCount }) {
  const [input, setInput] = useState(''); // 검색 input value 상태

  // 마운트 이후에 keyword값을 input value로 설정해주기(뒤로 왔을때도 검색했던 내용 input에 남아 있도록)
  useEffect(() => {
    setInput(keyword);
  }, [keyword]);

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

  const onKeyDownSearch = (e) => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  };
  return (
    <div className="search-area">
      <input
        type="search"
        placeholder="키워드 및 번호로 문답 검색"
        aria-label="검색어를 통한 각주 말씀 검색"
        value={input}
        onChange={onChageInput}
        onKeyDown={onKeyDownSearch}
      />
      <button type="button" onClick={onClickSearch}>
        검색
      </button>
    </div>
  );
}

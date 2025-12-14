const RECENT_VIEW_KEY = 'recentView';

// 최근 본 문답 조회
export function getRecentView() {
  if (localStorage.getItem(RECENT_VIEW_KEY)) {
    return JSON.parse(localStorage.getItem(RECENT_VIEW_KEY));
  } else {
    return [];
  }
}

// 최근 본 문답 추가
export function addRecentView(num) {
  const currentList = getRecentView();

  const existIndex = currentList.indexOf(Number(num));

  if (existIndex !== -1) {
    currentList.splice(existIndex, 1);
  }

  // 뒤로 추가
  currentList.push(Number(num));

  // 3개 초과되면 앞에서 제거
  if (currentList.length > 3) {
    currentList.shift();
  }

  localStorage.setItem(RECENT_VIEW_KEY, JSON.stringify(currentList));
}

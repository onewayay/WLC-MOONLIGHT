// src/utils/arrayToSpeechText.js

export function arrayToSpeechTexts(arr) {
  if (!Array.isArray(arr)) return arr ?? '';

  return arr
    .filter((item) => !/^\[\d+\]$/.test(item.trim())) // "[1]", "[2]" 같은 각주 마커 제거
    .map((item) => item.replace(/\s+/g, ' ').trim()) // \n, \t 등 공백 정리
    .filter((item) => item.length > 0) // 빈 문자열 제거
    .join(' ');
}

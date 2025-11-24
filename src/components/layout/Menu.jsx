import { useState } from 'react';
import '../../styles/menu.css';

export default function Menu({ qaNum, setQaNum, isTabOpen, closeTabMenu }) {
  console.log(qaNum, setQaNum);
  const [isBlockOpen, setIsBlockOpen] = useState(null); // 10개씩 블럭 열림/닫힘 상태.

  /* 문답 블럭 */
  const tenBlock = Array.from({ length: 20 }, (_, i) => {
    // minNum 부터 maxNum까지 10개씩 자른 블럭
    const minNum = i * 10 + 1;
    const maxNum = i === 19 ? 196 : i * 10 + 10;

    // 실제 minNum ~ maxNum 리스트
    const innerList = Array.from({ length: 10 }, (_, j) => {
      const num = minNum + j;
      if (num > maxNum) {
        return;
      }
      return (
        <li key={num}>
          <button type="button">{num}문</button>
        </li>
      );
    });

    const isActive = isBlockOpen === i;

    const spreadList = () => {
      if (isActive) {
        setIsBlockOpen(null);
      } else {
        setIsBlockOpen(i);
      }
    };

    return (
      <li key={i} className={isActive ? 'active' : ''}>
        <button type="button" onClick={spreadList}>
          {minNum}문~{maxNum}문
        </button>
        <ul>{innerList}</ul>
      </li>
    );
  });

  return (
    <>
      <div className={`menu ${isTabOpen ? 'active' : ''}`}>
        <ul>{tenBlock}</ul>
      </div>
      <div
        className={`dim ${isTabOpen ? 'active' : ''}`}
        onClick={closeTabMenu}
      ></div>
    </>
  );
}

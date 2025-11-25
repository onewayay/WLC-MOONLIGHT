import { useState } from 'react';
import '../../styles/menu.css';

export default function Menu({ qaNum, setQaNum, isTabOpen, closeTabMenu }) {
  console.log(qaNum, setQaNum);
  const [isBlockOpen, setIsBlockOpen] = useState(null); // 10개씩 블럭 열림/닫힘 상태.

  // 해당 문답 이동
  const moveNum = (e) => {
    setQaNum(Number(e.currentTarget.dataset.num));
    closeTabMenu();
    e.currentTarget.parentElement.classList.add('active');
  };

  /* 문답 블럭(10개씩) */
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
        <li key={num} className={Number(qaNum) === num ? 'on' : ''}>
          <button type="button" data-num={num} onClick={moveNum}>
            {num}문
          </button>
        </li>
      );
    });

    const isActive = isBlockOpen === i;

    // 문답 블럭 열림/닫힘
    const spreadList = () => {
      if (isActive) {
        setIsBlockOpen(null);
      } else {
        setIsBlockOpen(i);
      }
    };

    return (
      <li
        key={i}
        className={`${isActive ? 'active' : ''} ${
          minNum <= qaNum && qaNum <= maxNum ? 'active' : ''
        }`}
      >
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

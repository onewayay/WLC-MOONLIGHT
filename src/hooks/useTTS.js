import { useEffect, useRef, useState } from 'react';

export function useTTS(resetKey) {
  const audioRef = useRef(null); // 오디오 객체 있는지 상태
  const requestIdRef = useRef(0); // 요청별 번호표
  const debounceTimerRef = useRef(null); // 디바운싱 상태
  const [speakingKey, setSpeakingKey] = useState(null); // 어떤 부분이 재생 중인지 상태
  const [loadingKey, setLoadingKey] = useState(null); // 어떤 부분 요청이 들어왔는지 상태

  const isSpeaking = (key) => loadingKey === key || speakingKey === key;

  // 음성 요청 전체 멈춤 및 상태 비움
  const stopAll = () => {
    requestIdRef.current += 1; // 진행 중이던 응답을 무효화
    audioRef.current?.pause(); // 오디오 멈춤
    audioRef.current = null; // 오디오 객체 비움
    setSpeakingKey(null); // 실행중인 부분 키 비움
    setLoadingKey(null); // 요청한 부분 키 비움
  };

  const fetchSpeakText = async (text, lang, key) => {
    stopAll(); // 일단 다 멈춤 + 클리어
    const myRequestId = ++requestIdRef.current;
    setLoadingKey(key);

    //새로운 오디오 요청 및 재생 요청
    try {
      const res = await fetch(`/api/tts`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang }),
      });

      const data = await res.json();

      if (myRequestId !== requestIdRef.current) return; // 낡은 요청 무시

      if (!data.audioContent) {
        console.error('오디오 생성 실패:', data);
        setLoadingKey(null);
        return;
      }

      const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
      audioRef.current = audio; // 새로운 오디오를 상태로 관리
      setLoadingKey(null);
      setSpeakingKey(key); // 새로운 재생 부분 키 상태로 관리

      audio.onended = () => {
        setSpeakingKey(null);
        audioRef.current = null;
      };

      audio.onerror = () => {
        console.error('오디오 재생 에러');
        setSpeakingKey(null);
        audioRef.current = null;
      };

      audio.play();
    } catch (err) {
      console.error('오디오 생성 실패:', err);
      setLoadingKey(null);
    }
  };

  const handleStartSpeak = (text, lang, key) => {
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      fetchSpeakText(text, lang, key);
    }, 300);
  };

  const handleStopSpeak = () => {
    clearTimeout(debounceTimerRef.current);
    stopAll();
  };

  // resetKey(qaNum)가 바뀌거나 언마운트될 때 모두 멈추고 상태 비우기
  useEffect(() => {
    return () => {
      clearTimeout(debounceTimerRef.current);
      requestIdRef.current += 1;
      audioRef.current?.pause();
      audioRef.current = null;
      setSpeakingKey(null);
      setLoadingKey(null);
    };
  }, [resetKey]);

  return { isSpeaking, handleStartSpeak, handleStopSpeak };
}

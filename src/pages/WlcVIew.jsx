import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/wlcview.css';
import kor_data from '../assets/data/WLC_KOR.json';
import eng_data from '../assets/data/WLC_ENG.json';
import wlc_bible_kor from '../assets/data/wlc_bible_kor_v2.json';
import wlc_bible_eng from '../assets/data/wlc_bible_eng_v2.json';
import { useContext, useEffect, useRef, useState } from 'react';
import { addRecentView } from '../utils/recentView';
import { LangContext } from '../context/LangContext';
import { useTitle } from '../hooks/useTitle';
import { useMetaDescription } from '../hooks/useMetaDescription';
import { useCanonical } from '../hooks/useCanonical';
import { arrayToSpeechTexts } from '../utils/arrayToSpeechTexts';
import SpeakerMuteIcon from '../components/icons/SpeakerMuteIcon';
import SpeakerIcon from '../components/icons/SpeakerIcon';

export default function WlcView() {
  const { qaNum } = useParams(); // 현재 페이지의 문답 숫자

  const navigate = useNavigate();

  const { lang } = useContext(LangContext); // 언어 상태 컨텍스트

  const audioRef = useRef(null); // 오디오 객체 있는지 상태
  const requestIdRef = useRef(0); // 요청별 번호표
  const debounceTimerRef = useRef(null); // 디바운싱 상태
  const [speakingKey, setSpeakingKey] = useState(null); // 어떤 부분이 재생 중인지 상태
  const [loadingKey, setLoadingKey] = useState(null); // 어떤 부분 요청이 들어왔는지 상태

  const isSpeaking = (key) => loadingKey === key || speakingKey === key;

  // 현재 문답에 알맞는 한글 각주
  const presentKorBible = wlc_bible_kor.filter((item) => {
    return (kor_data[qaNum].ref ?? []).includes(Number(item.num));
  });
  // 현재 문답에 알맞는 영어 각주
  const presentEngBible = wlc_bible_eng.filter((item) => {
    return (eng_data[qaNum].ref ?? []).includes(Number(item.num));
  });

  const onClickPrev = () => {
    if (Number(qaNum) === 1) return;
    navigate(`/wlc/${Number(qaNum) - 1}`);
  };
  const onClickNext = () => {
    if (Number(qaNum) === 196) return;
    navigate(`/wlc/${Number(qaNum) + 1}`);
  };

  // 각주 렌더링
  const footnoteRender = presentKorBible.map((item, idx) => {
    return (
      <li key={idx}>
        <div className={`kor-verse ${lang === 'kor' ? 'active' : ''}`}>
          <div className="title-box">
            <strong>
              [{item.num}] {item.bible}
            </strong>
            <button
              type="button"
              className="speak-box"
              aria-pressed={isSpeaking(`kor-verse-${item.id}`)}
              aria-label={isSpeaking(`kor-verse-${item.id}`) ? `${item.num}번 각주 한글 음성 멈추기` : `${item.num}번 각주 한글 음성 듣기`}
              onClick={() =>
                isSpeaking(`kor-verse-${item.id}`)
                  ? handleStopSpeak()
                  : handleStartSpeak(arrayToSpeechTexts(item.verse), 'ko-KR', `kor-verse-${item.id}`)
              }
            >
              <div>{isSpeaking(`kor-verse-${item.id}`) ? <SpeakerMuteIcon /> : <SpeakerIcon />}</div>
            </button>
          </div>
          <p>{item.verse}</p>
        </div>
        <div className={`eng-verse ${lang === 'kor' ? '' : 'active'}`}>
          <div className="title-box">
            <strong>
              [{presentEngBible[idx]?.num}] {presentEngBible[idx]?.bible}
            </strong>
            <button
              type="button"
              className="speak-box"
              aria-pressed={isSpeaking(`eng-verse-${item.id}`)}
              aria-label={isSpeaking(`eng-verse-${item.id}`) ? `${item.num}번 각주 음성 멈추기` : `${item.num}번 각주 음성 듣기`}
              onClick={() =>
                isSpeaking(`eng-verse-${item.id}`)
                  ? handleStopSpeak()
                  : handleStartSpeak(arrayToSpeechTexts(presentEngBible[idx]?.verse), 'en-US', `eng-verse-${item.id}`)
              }
            >
              <div>{isSpeaking(`eng-verse-${item.id}`) ? <SpeakerMuteIcon /> : <SpeakerIcon />}</div>
            </button>
          </div>
          <p>{presentEngBible[idx]?.verse}</p>
        </div>
      </li>
    );
  });

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

  useEffect(() => {
    if (!qaNum) return;
    addRecentView(qaNum);
  }, [qaNum]);

  // qaNum 바뀔 때 allStop으로 멈추고 모든 상태 비워주기
  useEffect(() => {
    return () => {
      clearTimeout(debounceTimerRef.current);
      stopAll();
    };
  }, [qaNum]);

  // title 및 meta description 설정
  const questionTitle = kor_data[qaNum].Q ?? '';
  useTitle(`대요리 문답 제 ${qaNum}문 - ${questionTitle} | WLC MOONLIGHT`);
  useMetaDescription(`웨스트민스터 대요리문답 제 ${qaNum}문 "${questionTitle}"에 대한 질문과 답변, 그리고 관련 성경 구절을 제공합니다.`);
  useCanonical(`https://wlcmoonlight.vercel.app/wlc/${qaNum}`);

  return (
    <div className="wlc-view">
      <div className="inner">
        <div className="title">
          <div className="num-lang">
            <h2>제 {qaNum}문</h2>
          </div>
          <div className="move-btns">
            <button type="button" onClick={onClickPrev}>
              이전 문답
            </button>
            <button type="button" onClick={onClickNext}>
              다음 문답
            </button>
            <Link to="/wlc">리스트로 돌아가기</Link>
          </div>
        </div>
        <div className="qna">
          <div className={`kor-qna ${lang === 'kor' ? 'active' : ''}`}>
            <div className="question">
              <div className="title-box">
                <strong>질문</strong>
                <button
                  type="button"
                  className="speak-box"
                  aria-pressed={isSpeaking(`kor-Q`)}
                  aria-label={isSpeaking(`kor-Q`) ? `${qaNum}문 한글 음성 멈추기` : `${qaNum}문 한글 음성 듣기`}
                  onClick={() =>
                    isSpeaking('kor-Q') ? handleStopSpeak() : handleStartSpeak(arrayToSpeechTexts(kor_data[qaNum].Q), 'ko-KR', 'kor-Q')
                  }
                >
                  <div>{isSpeaking('kor-Q') ? <SpeakerMuteIcon /> : <SpeakerIcon />}</div>
                </button>
              </div>
              <p>{kor_data[qaNum].Q}</p>
            </div>
            <div className="answer">
              <div className="title-box">
                <strong>답변</strong>
                <button
                  type="button"
                  className="speak-box"
                  aria-pressed={isSpeaking(`kor-A`)}
                  aria-label={isSpeaking(`kor-A`) ? `${qaNum}답 한글 음성 멈추기` : `${qaNum}답 한글 음성 듣기`}
                  onClick={() =>
                    isSpeaking('kor-A') ? handleStopSpeak() : handleStartSpeak(arrayToSpeechTexts(kor_data[qaNum].A), 'ko-KR', 'kor-A')
                  }
                >
                  <div>{isSpeaking('kor-A') ? <SpeakerMuteIcon /> : <SpeakerIcon />}</div>
                </button>
              </div>
              <pre>{kor_data[qaNum].A}</pre>
            </div>
          </div>
          <div className={`eng-qna ${lang === 'kor' ? '' : 'active'}`}>
            <div className="question">
              <div className="title-box">
                <strong>Question</strong>
                <button
                  type="button"
                  className="speak-box"
                  aria-pressed={isSpeaking(`eng-Q`)}
                  aria-label={isSpeaking(`eng-Q`) ? `${qaNum}문 영문 음성 멈추기` : `${qaNum}문 영문 음성 듣기`}
                  onClick={() =>
                    isSpeaking('eng-Q') ? handleStopSpeak() : handleStartSpeak(arrayToSpeechTexts(eng_data[qaNum].Q), 'en-US', 'eng-Q')
                  }
                >
                  <div>{isSpeaking('eng-Q') ? <SpeakerMuteIcon /> : <SpeakerIcon />}</div>
                </button>
              </div>
              <p>{eng_data[qaNum].Q}</p>
            </div>
            <div className="answer">
              <div className="title-box">
                <strong>Answer</strong>
                <button
                  type="button"
                  className="speak-box"
                  aria-pressed={isSpeaking(`eng-A`)}
                  aria-label={isSpeaking(`eng-A`) ? `${qaNum}답 영문 음성 멈추기` : `${qaNum}답 영문 음성 듣기`}
                  onClick={() =>
                    isSpeaking('eng-A') ? handleStopSpeak() : handleStartSpeak(arrayToSpeechTexts(eng_data[qaNum].A), 'en-US', 'eng-A')
                  }
                >
                  <div>{isSpeaking('eng-A') ? <SpeakerMuteIcon /> : <SpeakerIcon />}</div>
                </button>
              </div>
              <pre>{eng_data[qaNum].A}</pre>
            </div>
          </div>
        </div>
        <div className="footnote">
          <h3>관련 성경 구절</h3>
          <ul className="verse-list">{footnoteRender}</ul>
        </div>
      </div>
    </div>
  );
}

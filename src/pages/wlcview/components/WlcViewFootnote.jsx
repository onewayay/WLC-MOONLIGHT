import SpeakerIcon from '@/components/icons/SpeakerIcon';
import SpeakerMuteIcon from '@/components/icons/SpeakerMuteIcon';
import { arrayToSpeechTexts } from '@/utils/arrayToSpeechTexts';

export default function WlcViewFootnote({ lang, presentEngBible, presentKorBible, isSpeaking, handleStartSpeak, handleStopSpeak }) {
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
  return (
    <div className="footnote">
      <h3>관련 성경 구절</h3>
      <ul className="verse-list">{footnoteRender}</ul>
    </div>
  );
}

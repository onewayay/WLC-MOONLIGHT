import SpeakerIcon from '@/components/icons/SpeakerIcon';
import SpeakerMuteIcon from '@/components/icons/SpeakerMuteIcon';
import { arrayToSpeechTexts } from '@/utils/arrayToSpeechTexts';

export default function WlcViewQnA({ qaNum, lang, korQna, engQna, isSpeaking, handleStartSpeak, handleStopSpeak }) {
  return (
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
              onClick={() => (isSpeaking('kor-Q') ? handleStopSpeak() : handleStartSpeak(arrayToSpeechTexts(korQna.Q), 'ko-KR', 'kor-Q'))}
            >
              <div>{isSpeaking('kor-Q') ? <SpeakerMuteIcon /> : <SpeakerIcon />}</div>
            </button>
          </div>
          <p>{korQna.Q}</p>
        </div>
        <div className="answer">
          <div className="title-box">
            <strong>답변</strong>
            <button
              type="button"
              className="speak-box"
              aria-pressed={isSpeaking(`kor-A`)}
              aria-label={isSpeaking(`kor-A`) ? `${qaNum}답 한글 음성 멈추기` : `${qaNum}답 한글 음성 듣기`}
              onClick={() => (isSpeaking('kor-A') ? handleStopSpeak() : handleStartSpeak(arrayToSpeechTexts(korQna.A), 'ko-KR', 'kor-A'))}
            >
              <div>{isSpeaking('kor-A') ? <SpeakerMuteIcon /> : <SpeakerIcon />}</div>
            </button>
          </div>
          <pre>{korQna.A}</pre>
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
              onClick={() => (isSpeaking('eng-Q') ? handleStopSpeak() : handleStartSpeak(arrayToSpeechTexts(engQna.Q), 'en-US', 'eng-Q'))}
            >
              <div>{isSpeaking('eng-Q') ? <SpeakerMuteIcon /> : <SpeakerIcon />}</div>
            </button>
          </div>
          <p>{engQna.Q}</p>
        </div>
        <div className="answer">
          <div className="title-box">
            <strong>Answer</strong>
            <button
              type="button"
              className="speak-box"
              aria-pressed={isSpeaking(`eng-A`)}
              aria-label={isSpeaking(`eng-A`) ? `${qaNum}답 영문 음성 멈추기` : `${qaNum}답 영문 음성 듣기`}
              onClick={() => (isSpeaking('eng-A') ? handleStopSpeak() : handleStartSpeak(arrayToSpeechTexts(engQna.A), 'en-US', 'eng-A'))}
            >
              <div>{isSpeaking('eng-A') ? <SpeakerMuteIcon /> : <SpeakerIcon />}</div>
            </button>
          </div>
          <pre>{engQna.A}</pre>
        </div>
      </div>
    </div>
  );
}

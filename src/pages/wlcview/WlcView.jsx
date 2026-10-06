import { useNavigate, useParams } from 'react-router-dom';
import '@/styles/wlcview.css';
import kor_data from '@/assets/data/WLC_KOR.json';
import eng_data from '@/assets/data/WLC_ENG.json';
import wlc_bible_kor from '@/assets/data/wlc_bible_kor_v2.json';
import wlc_bible_eng from '@/assets/data/wlc_bible_eng_v2.json';
import { useContext, useEffect } from 'react';
import { addRecentView } from '@/utils/recentView';
import { LangContext } from '@/context/LangContext';
import { useTitle } from '@/hooks/useTitle';
import { useMetaDescription } from '@/hooks/useMetaDescription';
import { useCanonical } from '@/hooks/useCanonical';
import { arrayToSpeechTexts } from '@/utils/arrayToSpeechTexts';
import SpeakerMuteIcon from '@/components/icons/SpeakerMuteIcon';
import SpeakerIcon from '@/components/icons/SpeakerIcon';
import WlcViewTitle from '@/pages/wlcview/components/WlcViewTitle';
import WlcViewQnA from '@/pages/wlcview/components/WlcViewQnA';
import { useTTS } from '@/hooks/useTTS';
import WlcViewFootnote from '@/pages/wlcview/components/WlcViewFootnote';

export default function WlcView() {
  const { qaNum } = useParams(); // 현재 페이지의 문답 숫자

  const navigate = useNavigate();

  const { lang } = useContext(LangContext); // 언어 상태 컨텍스트

  const { isSpeaking, handleStartSpeak, handleStopSpeak } = useTTS(qaNum); // qaNum 바뀌면 음성 멈춤

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

  useEffect(() => {
    if (!qaNum) return;
    addRecentView(qaNum);
  }, [qaNum]);

  // title 및 meta description 설정
  const questionTitle = kor_data[qaNum].Q ?? '';
  useTitle(`대요리 문답 제 ${qaNum}문 - ${questionTitle} | WLC MOONLIGHT`);
  useMetaDescription(`웨스트민스터 대요리문답 제 ${qaNum}문 "${questionTitle}"에 대한 질문과 답변, 그리고 관련 성경 구절을 제공합니다.`);
  useCanonical(`https://wlcmoonlight.vercel.app/wlc/${qaNum}`);

  return (
    <div className="wlc-view">
      <div className="inner">
        <WlcViewTitle onClickPrev={onClickPrev} onClickNext={onClickNext} qaNum={qaNum} />
        <WlcViewQnA
          qaNum={qaNum}
          lang={lang}
          korQna={kor_data[qaNum]}
          engQna={eng_data[qaNum]}
          isSpeaking={isSpeaking}
          handleStartSpeak={handleStartSpeak}
          handleStopSpeak={handleStopSpeak}
        />
        <WlcViewFootnote
          lang={lang}
          presentEngBible={presentEngBible}
          presentKorBible={presentKorBible}
          isSpeaking={isSpeaking}
          handleStartSpeak={handleStartSpeak}
          handleStopSpeak={handleStopSpeak}
        />
      </div>
    </div>
  );
}

export default async function fetchGoogleTTS(req, res) {
  const { text, lang } = req.body;

  const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_TTS_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: { text },
      voice: {
        languageCode: lang,
        ssmlGender: 'FEMALE',
      },
      audioConfig: {
        audioEncoding: 'MP3',
      },
    }),
  });

  const data = await response.json();
  res.status(200).json({ audioContent: data.audioContent });
}

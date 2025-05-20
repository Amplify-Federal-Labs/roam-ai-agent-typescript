import audioTranscriptJson from './json/response.audio_transcript.done.json';
import inputAudioTranscriptionJson from './json/conversation.item.input_audio_transcription.completed.json';
import {RoamEvenlope} from './Response';

describe('Response', () => {
  test('Should deserialize audio transcription', () => {
    const audioTranscript: RoamEvenlope = audioTranscriptJson;
    console.log(audioTranscript.payload.transcript);
  });

  test('Should deserialize input audio transacription', () => {
    const inputAudioTranscript: RoamEvenlope = inputAudioTranscriptionJson;
    console.log(inputAudioTranscript.payload.transcript);
  });
});

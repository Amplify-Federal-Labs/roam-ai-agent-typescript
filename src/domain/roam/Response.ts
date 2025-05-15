type RoamEnvelopeType =
  | 'response.done'
  | 'conversation.item.input_audio_transcription.completed'
  | 'response.audio_transcript.done'
  | 'input_audio_buffer.speech_started';

interface RoamEvenlope {
  id: string;
  type: RoamEnvelopeType;
  payload: RoamAudioTranscriptPayload;
}

interface RoamAudioTranscriptPayload {
  type: string;
  event_id: string;
  response_id: string;
  item_id: string;
  output_index: number;
  content_index: number;
  transcript: string;
}

export type {RoamEvenlope};



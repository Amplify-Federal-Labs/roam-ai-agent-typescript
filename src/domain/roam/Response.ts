interface RoamEvenlope {
  id: string;
  type: string;
  payload: RoamAudioTranscriptPayload | RoamInputAudioTranscriptPayload;
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

interface RoamInputAudioTranscriptPayload {
  type: string;
  event_id: string;
  item_id: string;
  content_index: number;
  transcript: string;
}

export type {RoamEvenlope};

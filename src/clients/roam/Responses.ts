import {Transcript} from './Transcript';

interface GetTranscriptsResponse {
  transcripts: Transcript[];
}

type GetTranscriptInfoResponse = Transcript;

export type {GetTranscriptsResponse, GetTranscriptInfoResponse};

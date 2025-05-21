import {Transcript} from './Transcript';

interface RoamInterface {
  getTranscripts: () => Promise<Transcript[]>;
  getTranscriptInfo: (id: string) => Promise<Transcript>;
}

export type {RoamInterface};

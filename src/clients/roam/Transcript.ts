import {User} from './User';

interface Transcript {
  id: string;
  meetingId: string;
  start: Date;
  end: Date;
  participants: User[];
  cues: Cue[];
}

interface Cue {
  speaker: string;
  text: string;
  start: Date;
  end: Date;
  startOffset: number;
  endOffset: number;
}

export type {Transcript};

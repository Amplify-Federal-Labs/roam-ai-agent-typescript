import {uploadTranscript} from '../clients/langbase/uploadTranscript';
import {Transcript} from '../clients/roam/Transcript';

const uploadMeetingTranscript = async (transcript: Transcript) => {
  const timeStamp = new Date().toUTCString();
  const participants = transcript.participants.map(p => p.name).join(',');

  const transcriptInText = transcript.cues.reduce(
    (prev, curr) => `${prev}\n\n${curr.speaker}: ${curr.text}`,
    `Date: ${timeStamp}\n\nParticipants: ${participants}`,
  );

  console.log(
    `Uploading transcript for meeting: ${transcript.meetingId} ${transcriptInText}`,
  );

  await uploadTranscript(transcript.meetingId, transcriptInText);
};

export {uploadMeetingTranscript};

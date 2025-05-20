import {Handler, HandlerEvent, HandlerContext} from '@netlify/functions';
import {JobReadyPayload} from '../../src/clients/roam/payload/JobReadyPayload';
import {TranscriptSavedPayload} from '../../src/clients/roam/payload/TranscriptSavedPayload';
import {uploadTranscript} from '../../src/clients/langbase/uploadTranscript';
import {v4} from 'uuid';

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {
  if (event.body) {
    const payload = JSON.parse(event.body);

    if (payload['type']) {
      const payloadType = payload['type'];
      if (payloadType === 'job.ready') {
        const jobReadyPayload: JobReadyPayload = payload;
        console.log(`Knock ready - sessionId: ${jobReadyPayload.sessionId}`);
      } else {
        // no op
        // nothing to do for JobServerRelay for now.
      }
    } else {
      // for now, this must be TranscriptSaved event
      const transcripSavedPayload: TranscriptSavedPayload = payload;

      const timeStamp = (new Date()).toUTCString();
      const participants = transcripSavedPayload.participants
        .map(p => p.name)
        .join(',');

      const transcript = transcripSavedPayload.cues.reduce(
        (prev, curr) => `${prev}\n\n${curr.speaker}: ${curr.text}`,
        `Date: ${timeStamp}\n\nParticipants: ${participants}`,
      );

      console.log(
        `Uploading transcript for meeting: ${transcripSavedPayload.meetingId} ${transcript}`,
      );

      // TODO: Use meeting id from the payload
      await uploadTranscript(v4(), transcript);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World',
      timestamp: Date.now(),
    }),
  };
};

export {handler};

import {Handler, HandlerEvent, HandlerContext} from '@netlify/functions';
import {JobReadyPayload} from '../../src/clients/roam/payload/JobReadyPayload';
import {TranscriptSavedPayload} from '../../src/clients/roam/payload/TranscriptSavedPayload';

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {
  console.log(event.body);

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
      transcripSavedPayload.cues.forEach(cue => {
        console.log(`Transcript: ${cue.speaker} ${cue.text}`);
      });
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

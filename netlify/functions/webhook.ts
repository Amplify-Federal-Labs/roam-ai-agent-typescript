import {Handler, HandlerEvent, HandlerContext} from '@netlify/functions';
import {JobReadyPayload} from '../../src/clients/roam/payload/JobReadyPayload';
import {uploadMeetingTranscript} from '../../src/utils/uploadMeetingTranscript';
import {TranscriptSavedPayload} from '../../src/clients/roam/payload/TranscriptSavedPayload';

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {
  if (event.body) {
    const eventBody = JSON.parse(event.body);

    if (eventBody['type']) {
      const eventType = eventBody['type'];
      if (eventType === 'job.ready') {
        const jobReadyPayload: JobReadyPayload = eventBody;
        console.log(`Knock ready - sessionId: ${jobReadyPayload.sessionId}`);
      } else if (eventType === 'job.server.relay') {
        const payload = eventBody['payload'];
        console.log(`Relaying Server Events: ${JSON.stringify(payload)}`);
        // no op
        // nothing to do for JobServerRelay for now.
      } else {
        console.error(`Unknown event type: ${JSON.stringify(eventBody)}`);
      }
    } else {
      const transcriptSavedPayload: TranscriptSavedPayload = eventBody;
      await uploadMeetingTranscript(transcriptSavedPayload);
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

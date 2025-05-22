import {Handler, HandlerEvent, HandlerContext} from '@netlify/functions';
import {JobReadyPayload} from '../../src/clients/roam/payload/JobReadyPayload';
import {uploadMeetingTranscript} from '../../src/utils/uploadMeetingTranscript';
import {TranscriptSavedPayload} from '../../src/clients/roam/payload/TranscriptSavedPayload';

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {
  if (event.body) {
    console.log(event.body);
    const eventBody = JSON.parse(event.body);

    if (eventBody['type']) {
      const payloadType = eventBody['type'];
      if (payloadType === 'job.ready') {
        const jobReadyPayload: JobReadyPayload = eventBody['payload'];
        console.log(`Knock ready - sessionId: ${jobReadyPayload.sessionId}`);
      } else {
        // no op
        // nothing to do for JobServerRelay for now.
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

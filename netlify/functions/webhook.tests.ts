import {HandlerEvent} from '@netlify/functions';
import {handler} from './webhook';
import jobReadyPayload from './json/jobReadyPayload.json';

describe('Webhook', () => {
  it('Should deserialize job.ready', async () => {
    const event: HandlerEvent = {
      body: {
        type: 'job.ready',
        payload: JSON.stringify(jobReadyPayload),
      }
    };

    await handler(event, context);
  })
})
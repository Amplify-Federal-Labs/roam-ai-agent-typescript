import {HandlerEvent, HandlerContext} from '@netlify/functions';
import {handler} from './webhook';
import jobReadyEvent from './json/jobReady.json';
import {mock, instance} from 'ts-mockito';

describe('Webhook', () => {
  const mockHandlerEvent: HandlerEvent = mock<HandlerEvent>();
  const mockHandlerContext: HandlerContext = mock<HandlerContext>();

  it('Should handle Knock Ready', async () => {
    const event = instance(mockHandlerEvent);
    const context = instance(mockHandlerContext);

    event.body = JSON.stringify(jobReadyEvent);

    await handler(event, context);
  });
});

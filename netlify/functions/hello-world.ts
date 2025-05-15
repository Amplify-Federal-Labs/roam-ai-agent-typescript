import {Handler, HandlerEvent, HandlerContext} from '@netlify/functions';

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {

  console.log(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World',
      timestamp: Date.now(),
    }),
  };
};

export {handler};

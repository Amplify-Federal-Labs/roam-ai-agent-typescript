import {Handler} from '@netlify/functions';

const handler: Handler = async (event, context) => {
  if (event.body !== null) {
    const body = JSON.parse(event.body);
    console.log(body);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({message: 'Hello World'}),
  };
};

export {handler};

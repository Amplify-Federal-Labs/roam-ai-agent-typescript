import 'dotenv/config';
import {Langbase} from 'langbase';

const langbase = new Langbase({
  apiKey: process.env.LANGBASE_API_KEY!,
});

const uploadTranscript = async (
  meetingId: string,
  transcript: string,
): Promise<void> => {
  const memoryName = 'knowledge-base';

  // Upload agent architecture document
  const agentResult = await langbase.memories.documents.upload({
    memoryName,
    contentType: 'text/plain',
    documentName: `${meetingId}.txt`,
    document: Buffer.from(transcript),
    // meta: { category: 'Examples', topic: 'Agent architecture' },
  });

  console.log(agentResult.ok ? '✓ Agent doc uploaded' : '✗ Agent doc failed');
};

export {uploadTranscript};

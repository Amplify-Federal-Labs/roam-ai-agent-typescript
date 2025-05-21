import 'dotenv/config';
import axios from 'axios';
import {RoamClient} from '../clients/roam/RoamClient';
import {uploadMeetingTranscript} from './uploadMeetingTranscript';

async function main() {
  const instance = axios.create({
    baseURL: process.env.ROAM_API_BASEURL!,
    headers: {
      Authorization: `Bearer ${process.env.ROAM_API_KEY!}`,
    },
  });
  const roamClient = new RoamClient(instance);

  const transcripts = await roamClient.getTranscripts();
  transcripts.forEach(async transcript => {
    const transcriptInfo = await roamClient.getTranscriptInfo(transcript.id);
    await uploadMeetingTranscript(transcriptInfo);
  });
}

main();

import {Transcript} from './Transcript';
import {GetTranscriptsResponse, GetTranscriptInfoResponse} from './Responses';
import {RoamInterface} from './RoamInterface';
import {AxiosInstance, AxiosRequestConfig} from 'axios';

class RoamClient implements RoamInterface {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getTranscripts(): Promise<Transcript[]> {
    const {data} = await this.client.get<GetTranscriptsResponse>(
      '/v0/transcript.list',
    );
    return data.transcripts;
  }

  async getTranscriptInfo(id: string) {
    const requestConfig: AxiosRequestConfig = {
      params: {
        id,
      },
    };

    const {data: transcript} = await this.client.get<GetTranscriptInfoResponse>(
      '/v0/transcript.info',
      requestConfig,
    );

    return transcript;
  }
}

export {RoamClient};

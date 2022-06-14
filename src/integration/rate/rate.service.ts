import { HttpService, Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { environmentVariables } from '../../config/env-config';
import { RateDto } from './rate.dto';

@Injectable()
export class RateClientService {
  constructor(private readonly httpService: HttpService) {}

  public async convert(requestPayload: RateDto) {
    const rateServiceUrl = environmentVariables.rate.ServiceUrl as string;

    const requestHeader = this.buildRateApiHeader();
    let resp;
    try {
      const response = await lastValueFrom(
        this.httpService.post(rateServiceUrl, requestPayload, {
          url: rateServiceUrl,
          method: 'POST',
          headers: requestHeader,
          data: requestPayload,
        }),
      );

      resp = response.data.data;
    } catch (ex) {
      Logger.debug('unable to convert due to error: ', ex);
      resp = ex;
    }
    return resp;
  }

  private buildRateApiHeader() {
    const apiKey = environmentVariables.rate.ApiKey;
    return {
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };
  }
}

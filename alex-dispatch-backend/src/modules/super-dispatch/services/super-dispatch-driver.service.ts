import { Injectable } from '@nestjs/common';
import { DispatchApiClientService } from '../modules/dispatch-api-client/dispatch-api-client.service';
import { DispatchUrlService } from './super-dispatch-url.service';
import { DispatchDriver } from '../model/driver.domain';
import { DispatchEntityResponse } from '../model/types';

@Injectable()
export class SuperDispatchDriverService {
  private static readonly MAX_REQUESTS = 50;

  constructor(
    private readonly dispatchApi: DispatchApiClientService,
    private readonly urlService: DispatchUrlService
  ) {}

  public async getDriverInfo() {
    const url = this.urlService.getUrlByKey('drivers');

    const driversCollection: DispatchDriver[] = [];

    await this.getDriversRecursively(url, driversCollection);

    return driversCollection;
  }

  private async getDriversRecursively(
    url: string,
    drivers: DispatchDriver[],
    visitedUrls: Set<string> = new Set<string>(),
    requestsCount = 0
  ): Promise<DispatchDriver[]> {
    if (visitedUrls.has(url)) {
      throw new Error(`Detected pagination cycle for URL: ${url}`);
    }

    if (requestsCount >= SuperDispatchDriverService.MAX_REQUESTS) {
      throw new Error(
        `Drivers pagination exceeded ${SuperDispatchDriverService.MAX_REQUESTS} requests`
      );
    }

    visitedUrls.add(url);

    const response = await this.dispatchApi.get<
      DispatchEntityResponse<DispatchDriver>
    >({
      url
    });

    drivers.push(...response.data);

    if (response?.pagination?.next) {
      await this.getDriversRecursively(
        response.pagination.next,
        drivers,
        visitedUrls,
        requestsCount + 1
      );
    }

    return drivers;
  }
}

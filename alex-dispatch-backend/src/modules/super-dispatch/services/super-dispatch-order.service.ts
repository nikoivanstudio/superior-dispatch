import { Injectable } from '@nestjs/common';
import { DispatchApiClientService } from '../modules/dispatch-api-client/dispatch-api-client.service';
import { DispatchUrlService } from './super-dispatch-url.service';
import { DispatchDriver } from '../model/driver.domain';
import { DispatchEntityResponse } from '../model/types';

@Injectable()
export class SuperDispatchOrderService {
  private static readonly MAX_REQUESTS = 100;
  constructor(
    private readonly dispatchApi: DispatchApiClientService,
    private readonly urlService: DispatchUrlService
  ) {}

  public async getUserOrders() {
    const url = this.urlService.getUrlByKey('orders');

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
    //TODO: остановился тут
    if (visitedUrls.has(url)) {
      throw new Error(`Detected pagination cycle for URL: ${url}`);
    }

    if (requestsCount >= SuperDispatchOrderService.MAX_REQUESTS) {
      throw new Error(
        `Orders pagination exceeded ${SuperDispatchOrderService.MAX_REQUESTS} requests`
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

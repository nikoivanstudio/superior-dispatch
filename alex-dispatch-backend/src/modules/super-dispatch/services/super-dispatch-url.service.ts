import { Injectable } from '@nestjs/common';
import { CARRIER_ID } from '../modules/dispatch-api-client/constants/dispatch-api.settings';

type UrlKeyMapping = {
  drivers: string;
  orders: string;
};

@Injectable()
export class DispatchUrlService {
  private readonly urlKeyMapping: UrlKeyMapping = {
    drivers: `/carriers/${CARRIER_ID}/drivers`,
    orders: `/orders/`
  };

  public getUrlByKey(key: string) {
    return this.isKeyofUrlKeyMapping(key) ? this.urlKeyMapping[key] : key;
  }

  private isKeyofUrlKeyMapping = (key: string): key is keyof UrlKeyMapping =>
    key in this.urlKeyMapping;
}

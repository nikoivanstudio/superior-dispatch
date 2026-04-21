import { Injectable } from '@nestjs/common';
import { DispatchTokenProviderService } from './modules/dispatch-token-provider/dispatch-token-provider.service';
import { UrlUtils } from '../../../../common/lib/url.utils';

type RequestParams = {
  url: string;
  queryParams?: Record<string, string | number>;
  withoutParse?: boolean;
} & RequestInit;

@Injectable()
export class DispatchApiClientService {
  private readonly baseUrl: string = 'https://carrier.superdispatch.com/v1';

  constructor(
    private readonly dispatchTokenProviderService: DispatchTokenProviderService
  ) {}

  get = <T>(params: RequestParams): Promise<T> =>
    this.request<T>({ ...params, method: 'GET', body: undefined });

  post = <T>(params: RequestParams) =>
    this.request<T>({ ...params, method: 'POST' });

  put = <T>(params: RequestParams) =>
    this.request<T>({ ...params, method: 'PUT' });

  patch = <T>(params: RequestParams) =>
    this.request<T>({ ...params, method: 'PATCH' });

  del = <T>(params: RequestParams) =>
    this.request<T>({ ...params, method: 'DELETE' });

  private getUrl(
    url: string,
    queryParams?: Record<string, string | number>
  ): string {
    if (url.includes('http') || url.includes('https')) {
      return url;
    }

    return `${this.baseUrl}${UrlUtils.getUrl(url, queryParams)}`;
  }

  private async getRequiredHeaders() {
    const token = await this.dispatchTokenProviderService.getToken();

    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  private async request<T>({
    url,
    body,
    method,
    signal,
    headers,
    queryParams,
    withoutParse
  }: RequestParams): Promise<T> {
    const requiredHeaders = await this.getRequiredHeaders();
    const newUrl = this.getUrl(url, queryParams);

    const response = await fetch(newUrl, {
      method,
      body,
      signal,
      headers: {
        ...requiredHeaders,
        ...headers
      }
    });

    if (withoutParse) {
      return response as T;
    }

    if (!response.ok) {
      const errorPayload = await response.text();
      throw new Error(
        `Dispatch API request failed: ${response.status} ${response.statusText}. URL: ${newUrl}. Body: ${errorPayload.slice(
          0,
          500
        )}`
      );
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      const payload = await response.text();
      throw new Error(
        `Dispatch API returned non-JSON response. URL: ${newUrl}. Content-Type: ${contentType}. Body: ${payload.slice(
          0,
          500
        )}`
      );
    }

    return response.json() as Promise<T>;
  }
}

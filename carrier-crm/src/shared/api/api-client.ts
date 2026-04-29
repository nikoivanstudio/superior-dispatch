import { urlUtils } from '../lib/url-utils';
import { apiUtils } from '../lib/api-utils';

type RequestParams = {
  url: string;
  queryParams?: Record<string, string | number>;
  withoutParse?: boolean;
} & RequestInit;

const request = async <T>({
  url,
  body,
  method,
  signal,
  headers,
  credentials,
  queryParams,
  withoutParse
}: RequestParams): Promise<T> => {
  let response: Response;

  try {
    response = await fetch(`${urlUtils.getUrl(url, queryParams)}`, {
      method,
      body,
      signal,
      credentials: credentials ?? 'include',
      headers: {
        'X-API-KEY': 'X_API_KEY_SUPERIOR_DISPATCH',
        ...headers
      }
    });
  } catch (error) {
    throw apiUtils.createBackendUnavailableError(error);
  }

  return withoutParse ? (response as T) : await response.json();
};

const get = <T>(params: RequestParams): Promise<T> =>
  request<T>({ ...params, method: 'GET', body: undefined });

const post = <T>(params: RequestParams) =>
  request<T>({ ...params, method: 'POST' });

const put = <T>(params: RequestParams) =>
  request<T>({ ...params, method: 'PUT' });

const patch = <T>(params: RequestParams) =>
  request<T>({ ...params, method: 'PATCH' });

const del = <T>(params: RequestParams) =>
  request<T>({ ...params, method: 'DELETE' });

export const apiClient = { get, post, put, patch, del };

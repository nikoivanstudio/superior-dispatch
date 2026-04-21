const DEFAULT_BACKEND_BASE_URL = 'http://api.localtest.me:3001';

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const getBackendBaseUrl = (): string => {
  const configuredUrl = process.env.CRM_API_BASE_URL?.trim();

  if (configuredUrl) {
    return trimTrailingSlash(configuredUrl);
  }

  if (process.env.NODE_ENV !== 'production') {
    return DEFAULT_BACKEND_BASE_URL;
  }

  throw new Error('CRM_API_BASE_URL is required in production');
};

const getSetCookieHeader = (response: Response) => {
  const setCookieHeader = response.headers.get('set-cookie');

  if (!setCookieHeader) {
    throw new Error('Expected Set-Cookie header from auth backend');
  }

  return setCookieHeader;
};

export const backendUtils = { getBackendBaseUrl, getSetCookieHeader };

import { APP_SETTINGS } from '@/shared/constants/app-settings';

const DEFAULT_APP_ORIGIN = 'https://superior-dispatch.app';
const DEFAULT_BACKEND_BASE_URL = 'http://api.localtest.me:3001';

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');
const trimLeadingSlash = (value: string) => value.replace(/^\/+/, '');
const isAbsoluteUrl = (value: string) => /^[a-z][a-z\d+\-.]*:\/\//i.test(value);

const getOrigin = (): string => {
  const browserOrigin = globalThis.location?.origin?.trim();

  if (browserOrigin) {
    return trimTrailingSlash(browserOrigin);
  }

  const configuredOrigin = import.meta.env.VITE_CRM_APP_ORIGIN?.trim();

  if (configuredOrigin) {
    return trimTrailingSlash(configuredOrigin);
  }

  if (import.meta.env.DEV) {
    return 'http://crm.localtest.me:5173';
  }

  return DEFAULT_APP_ORIGIN;
};

const getApiRoute = (): string => '/api';
const getApiUrl = (): string => `${getOrigin()}${getApiRoute()}`;
const getQueryParamsString = (
  queryParams?: Record<string, string | number>
): string => {
  if (!queryParams) {
    return '';
  }

  return Object.entries(queryParams)
    .filter(([key, value]) => !!key && !!value)
    .reduce(
      (acc, [key, value]) =>
        (acc += `${acc !== '?' ? '&' : ''}${key}=${value}`),
      '?'
    );
};

const getUrl = (
  slug: string,
  queryParams?: Record<string, string | number>
) => {
  const baseUrl = isAbsoluteUrl(slug)
    ? trimTrailingSlash(slug)
    : `${getApiUrl()}/${trimLeadingSlash(slug)}`;

  return `${baseUrl}${getQueryParamsString(queryParams)}`;
};

const sanitizeRedirectTarget = (target: string | null | undefined) => {
  if (!target || !target.startsWith('/') || target.startsWith('//')) {
    return null;
  }

  return target;
};
const getBackendBaseUrl = (): string => {
  const configuredUrl = import.meta.env.VITE_CRM_API_BASE_URL?.trim();

  if (configuredUrl) {
    return trimTrailingSlash(configuredUrl);
  }

  if (import.meta.env.DEV) {
    return DEFAULT_BACKEND_BASE_URL;
  }

  throw new Error('VITE_CRM_API_BASE_URL is required in production');
};

const getPostLoginRedirect = (request: Request) => {
  const url = new URL(request.url);

  return (
    sanitizeRedirectTarget(url.searchParams.get('redirectTo')) ??
    APP_SETTINGS.DEFAULT_PROTECTED_REDIRECT
  );
};

const getRequestPath = (request: Request) => {
  const url = new URL(request.url);
  return `${url.pathname}${url.search}`;
};

export const urlUtils = {
  getOrigin,
  getApiRoute,
  getApiUrl,
  getUrl,
  sanitizeRedirectTarget,
  getBackendBaseUrl,
  getPostLoginRedirect,
  getRequestPath
};

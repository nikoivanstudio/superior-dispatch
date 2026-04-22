import { CookieOptions } from 'express';

export const jwtSecret = process.env.JWT_SECRET as string;
export const tokenLifeTime = 24 * 60 * 60;
export const JWT_SECURE = process.env.NODE_ENV === 'production';
export const DEFAULT_USER_ROLE = 'DISPATCHER';
export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;
export const AUTH_COOKIE_NAME = 'access_token';

export const COOKIE_SETTINGS: CookieOptions = {
  httpOnly: true,
  secure: JWT_SECURE,
  sameSite: 'strict',
  domain: COOKIE_DOMAIN || undefined,
  maxAge: 1000 * 60 * 60 * 24
};

if (!jwtSecret) {
  throw new Error('JWT_SECRET_NOT_FOUND');
}

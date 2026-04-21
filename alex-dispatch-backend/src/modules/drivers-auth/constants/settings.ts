import { getRequiredEnv } from '../../../common/lib/utils';

export const jwtSecret = getRequiredEnv('JWT_SECRET_MOBILE_APP');
export const tokenLifeTime = 24 * 60 * 60;

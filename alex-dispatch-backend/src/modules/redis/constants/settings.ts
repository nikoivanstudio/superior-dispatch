import { getRequiredEnv } from '../../../common/lib/utils';

export const REDIS_HOST = getRequiredEnv('REDIS_HOST');
export const REDIS_PORT = getRequiredEnv('REDIS_PORT');
export const REDIS_PASSWORD = getRequiredEnv('REDIS_PASSWORD');

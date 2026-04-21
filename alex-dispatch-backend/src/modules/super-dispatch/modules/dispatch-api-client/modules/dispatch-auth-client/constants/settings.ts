import { getRequiredEnv } from '../../../../../../../common/lib/utils';

export const CLIENT_ID = getRequiredEnv('SUPER_DISPATCH_CLIENT_ID');
export const CLIENT_SECRET = getRequiredEnv('SUPER_DISPATCH_CLIENT_SECRET');

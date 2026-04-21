import { Injectable } from '@nestjs/common';
import { RedisService } from '../../../../../redis/redis.service';
import { DispatchToken, StringifiedDispatchToken } from './model/domain';
import {
  dispatchTokenSchema,
  stringifiedDispatchTokenSchema
} from './model/validation/dispatch-token.schema';

@Injectable()
export class DispatchTokenStoreService {
  private readonly tokenName: string = 'dispatch_token';

  constructor(private readonly redisService: RedisService) {}

  public async getToken(): Promise<string | null> {
    const token = await this.redisService.hGetAll(this.tokenName);

    if (!token) {
      return null;
    }

    if (!this.validateStringifiedToken(token)) {
      await this.redisService.delete(this.tokenName);

      return null;
    }

    return (token as StringifiedDispatchToken).access_token;
  }

  public async saveToken(token: unknown): Promise<string | null> {
    if (!this.validateToken(token)) {
      console.error('Token is invalid');

      return null;
    }

    const { expires_in, ...restToken } = token;

    const stringifiedToken = { ...restToken, expires_in: String(expires_in) };

    await this.redisService.hSet(this.tokenName, stringifiedToken);

    return token.access_token;
  }

  private validateToken(value: unknown): value is DispatchToken {
    return dispatchTokenSchema.safeParse(value).success;
  }

  private validateStringifiedToken(token: Record<string, string>): boolean {
    const tokenResult = stringifiedDispatchTokenSchema.safeParse(token);

    if (!tokenResult.success) {
      console.error('Token is invalid');

      return false;
    }

    const isExpired = Number(tokenResult.data.expires_in) < Date.now();

    if (isExpired) {
      console.error('Token expired');

      return false;
    }

    return true;
  }
}

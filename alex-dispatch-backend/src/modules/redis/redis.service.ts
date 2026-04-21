import { Injectable } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from './constants/settings';

@Injectable()
export class RedisService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      socket: {
        host: REDIS_HOST,
        port: Number(REDIS_PORT),
      },
      password: REDIS_PASSWORD,
    });

    this.client.on('error', (error) => {
      console.error('Redis error:', error);
      if (error instanceof AggregateError) {
        console.error('Redis aggregate causes:', error.errors);
      }
    });
  }

  public async onModuleInit(): Promise<void> {
    await this.client.connect();
  }

  public async onModuleDestroy(): Promise<void> {
    await this.client.quit();
  }

  public async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  public async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  public async hSet(key: string, value: Record<string, string>): Promise<void> {
    await this.client.hSet(key, value);
  }

  public hGetAll(key: string): Promise<Record<string, string> | null> {
    return this.client.hGetAll(key);
  }

  public delete(key: string): Promise<unknown> {
    return this.client.del(key);
  }
}

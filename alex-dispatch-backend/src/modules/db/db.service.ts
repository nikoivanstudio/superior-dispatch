import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../../generated/prisma/client';
import { getRequiredEnv } from '../../common/lib/utils';

@Injectable()
export class DbService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString = getRequiredEnv('DATABASE_URL');
    const adapter = new PrismaPg({ connectionString });
    super({ adapter });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  public enableShutdownHooks(app: INestApplication): void {
    process.on('beforeExit', () => {
      void app.close();
    });
  }
}

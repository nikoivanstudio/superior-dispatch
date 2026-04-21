import { Module } from '@nestjs/common';
import { DispatchTokenStoreService } from './dispatch-token-store.service';
import { RedisModule } from '../../../../../redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [DispatchTokenStoreService],
  exports: [DispatchTokenStoreService]
})
export class DispatchTokenStoreModule {}

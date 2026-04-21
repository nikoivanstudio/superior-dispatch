import { Module } from '@nestjs/common';

import { DispatchAuthClientService } from './dispatch-auth-client.service';

@Module({
  controllers: [],
  providers: [DispatchAuthClientService],
  exports: [DispatchAuthClientService],
})
export class DispatchAuthClientModule {}

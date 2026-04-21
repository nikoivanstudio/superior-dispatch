import { Module } from '@nestjs/common';
import { DispatchTokenProviderModule } from './modules/dispatch-token-provider/dispatch-token-provider.module';
import { DispatchApiClientService } from './dispatch-api-client.service';

@Module({
  imports: [DispatchTokenProviderModule],
  providers: [DispatchApiClientService],
  exports: [DispatchApiClientService]
})
export class DispatchApiClientModule {}

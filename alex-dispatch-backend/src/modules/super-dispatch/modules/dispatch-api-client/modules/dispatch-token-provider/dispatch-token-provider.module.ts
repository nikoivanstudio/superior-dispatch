import { Module } from '@nestjs/common';
import { DispatchAuthClientModule } from '../dispatch-auth-client/dispatch-auth-client.module';
import { DispatchTokenStoreModule } from '../dispatch-token-store/dispatch-token-store.module';
import { DispatchTokenProviderService } from './dispatch-token-provider.service';

@Module({
  imports: [DispatchAuthClientModule, DispatchTokenStoreModule],
  providers: [DispatchTokenProviderService],
  exports: [DispatchTokenProviderService]
})
export class DispatchTokenProviderModule {}

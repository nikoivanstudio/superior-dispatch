import { Module } from '@nestjs/common';
import { DispatchApiClientModule } from './modules/dispatch-api-client/dispatch-api-client.module';
import { SuperDispatchService } from './super-dispatch.service';
import { DispatchUrlService } from './services/super-dispatch-url.service';
import { SuperDispatchDriverService } from './services/super-dispatch-driver.service';

@Module({
  imports: [DispatchApiClientModule],
  providers: [
    SuperDispatchService,
    DispatchUrlService,
    SuperDispatchDriverService
  ],
  exports: [SuperDispatchService]
})
export class SuperDispatchModule {}

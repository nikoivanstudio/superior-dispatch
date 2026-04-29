import { Module } from '@nestjs/common';
import { CarrierService } from './carrier.service';
import { CarrierSettingsModule } from './modules/carrier-settings/carrier-settings.module';

@Module({
  imports: [CarrierSettingsModule],
  controllers: [],
  providers: [CarrierService]
})
export class CarrierModule {
  constructor(private readonly carrierService: CarrierService) {}
}

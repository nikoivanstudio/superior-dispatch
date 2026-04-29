import { Module } from '@nestjs/common';
import { CarrierService } from './carrier.service';
import { CarrierSettingsModule } from './modules/carrier-settings/carrier-settings.module';
import { CarrierProfileModule } from './modules/carrier-profile/carrier-profile.module';

@Module({
  imports: [CarrierSettingsModule, CarrierProfileModule],
  controllers: [],
  providers: [CarrierService]
})
export class CarrierModule {
  constructor(private readonly carrierService: CarrierService) {}
}

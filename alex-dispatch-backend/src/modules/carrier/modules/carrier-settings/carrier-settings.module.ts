import { Module } from '@nestjs/common';
import { UsersModule } from '../../../users/users.module';
import { DriverAppRepository } from './repositories/driver-app.repository';
import { CarrierSettingsService } from './carrier-settings.service';
import { CarrierSettingsController } from './carrier-settings.controller';
import { UpdateDriverAppSettingsPipe } from './pipes/update-driver-app-settings.pipe';
import { ValidateOwnDriverAppSettingsPipe } from './pipes/validate-own-driver-app-settings.pipe';

import { FactoringRepository } from './repositories/factoring.repository';
import { UpdateBillingSettingsPipe } from './pipes/update-billing-settings.pipe';
import { BillingSettingsRepository } from './repositories/billing-settings.repository';
import { NotificationsRepository } from './repositories/notifications.repository';
import { UpdateNotificationsPipe } from './pipes/update-notifications.pipe';
import { UpdateFactoringPipe } from './pipes/update-factoring.pipe';

@Module({
  imports: [UsersModule],
  controllers: [CarrierSettingsController],
  providers: [
    DriverAppRepository,
    BillingSettingsRepository,
    NotificationsRepository,
    FactoringRepository,
    CarrierSettingsService,
    UpdateDriverAppSettingsPipe,
    UpdateBillingSettingsPipe,
    UpdateNotificationsPipe,
    UpdateFactoringPipe,
    ValidateOwnDriverAppSettingsPipe
  ],
  exports: []
})
export class CarrierSettingsModule {}

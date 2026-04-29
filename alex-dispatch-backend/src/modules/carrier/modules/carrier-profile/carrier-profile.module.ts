import { Module } from '@nestjs/common';
import { UsersModule } from '../../../users/users.module';
import { CarrierProfileController } from './carrier-profile.controller';
import { CarrierProfileService } from './carrier-profile.service';
import { CarrierInfoRepository } from './repositories/carrier-info.repository';
import { PModeInfoRepository } from './repositories/p-mode-info.repository';
import { SuperDispatchInfoRepository } from './repositories/super-dispatch-info.repository';
import { UpdateCarrierInfoPipe } from './pipes/update-carrier-info.pipe';
import { UpdatePModeInfoPipe } from './pipes/update-p-mode-info.pipe';
import { UpdateSuperDispatchInfoPipe } from './pipes/update-super-dispatch-info.pipe';
import { ValidateOwnCarrierProfilePipe } from './pipes/validate-own-carrier-profile.pipe';

@Module({
  imports: [UsersModule],
  controllers: [CarrierProfileController],
  providers: [
    CarrierInfoRepository,
    PModeInfoRepository,
    SuperDispatchInfoRepository,
    CarrierProfileService,
    UpdateCarrierInfoPipe,
    UpdatePModeInfoPipe,
    UpdateSuperDispatchInfoPipe,
    ValidateOwnCarrierProfilePipe
  ],
  exports: []
})
export class CarrierProfileModule {}

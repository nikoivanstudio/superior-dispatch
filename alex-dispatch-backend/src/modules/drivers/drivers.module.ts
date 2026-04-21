import { Module } from '@nestjs/common';
import { DriversRepository } from './repositories/drivers.repository';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { SuperDispatchModule } from '../super-dispatch/super-dispatch.module';

@Module({
  imports: [SuperDispatchModule],
  providers: [DriversRepository, DriversService],
  controllers: [DriversController],
  exports: [DriversService]
})
export class DriversModule {}

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriverSelfGuard } from './guards/driver-self.guard';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  //TODO: Проверка на то, что пользователь запрашивает свою информацию
  @UseGuards(DriverSelfGuard)
  @Get(':email')
  public async getDriver(@Param('email') email: string) {
    return this.driversService.getDriverInfo(email);
  }
}

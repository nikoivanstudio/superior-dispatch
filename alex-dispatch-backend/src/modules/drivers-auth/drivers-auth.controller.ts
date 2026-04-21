import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { DriversAuthService } from './drivers-auth.service';
import { DriverSignupValidationPipe } from './pipes/driver-signup-validation.pipe';
import { DriverToken } from './model/domain';

@Controller('drivers')
export class DriversAuthController {
  constructor(private driversAuthService: DriversAuthService) {}

  @UsePipes(DriverSignupValidationPipe)
  @Post('signin')
  public async signin(
    @Body() driver: { email: string; password: string }
  ): Promise<DriverToken> {
    const { id, email, status } =
      await this.driversAuthService.validateDriver(driver);

    return this.driversAuthService.createToken({ id, email, status });
  }

  @UsePipes(DriverSignupValidationPipe)
  @Post('signup')
  public async signup(
    @Body() driver: { email: string; password: string }
  ): Promise<DriverToken> {
    const { id, email, status } =
      await this.driversAuthService.createDriver(driver);

    return this.driversAuthService.createToken({ id, email, status });
  }
}

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret, tokenLifeTime } from './constants/settings';
import { DriversAuthService } from './drivers-auth.service';
import { DriversCustomJwtStrategy } from './strategies/drivers-custom-jwt-strategy.strategy';
import { DriversAuthController } from './drivers-auth.controller';
import { DriversModule } from '../drivers/drivers.module';
import { SuperDispatchModule } from '../super-dispatch/super-dispatch.module';

@Module({
  imports: [
    DriversModule,
    SuperDispatchModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: tokenLifeTime }
    })
  ],
  providers: [DriversAuthService, DriversCustomJwtStrategy],
  controllers: [DriversAuthController],
  exports: [DriversAuthService]
})
export class DriversAuthModule {}
